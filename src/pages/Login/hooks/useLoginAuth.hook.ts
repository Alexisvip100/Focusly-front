import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from '@/api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/auth/auth.slice';
import { AuthProviders } from '../types/Login.types';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/context/firebase';

interface UseLoginAuthProps {
  onAuthSuccess?: () => void;
  onAuthError?: (error: unknown, context: string) => void;
}

export const useLoginAuth = ({ onAuthSuccess, onAuthError }: UseLoginAuthProps = {}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const sendMagicLink = async (email: string, fullName?: string) => {
    setIsLoading(true);
    try {
      const actionCodeSettings = {
        // La URL a la que redirigir tras el clic en el email.
        // Asegúrate de que este dominio esté en la lista blanca de Firebase.
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Guardamos el email localmente para completar el sign-in al volver.
      window.localStorage.setItem('emailForSignIn', email);
      if (fullName) {
        window.localStorage.setItem('fullNameForSignIn', fullName);
      }

      onAuthSuccess?.();
      return true;
    } catch (error) {
      onAuthError?.(error, 'Error sending magic link');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const completeMagicLinkSignIn = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setIsLoading(true);
      try {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // Si el usuario abrió el link en otro dispositivo/navegador,
          // le pedimos el email de nuevo.
          email = window.prompt('Please provide your email for confirmation');
        }

        if (email) {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          const user = result.user;

          // Si es registro (nombre guardado), actualizamos el perfil
          const savedFullName = window.localStorage.getItem('fullNameForSignIn');
          if (savedFullName && !user.displayName) {
            await updateProfile(user, { displayName: savedFullName });
          }

          const token = await user.getIdToken();
          const fullName = user.displayName || savedFullName || '';

          const response = await axios.post('/auth/login', { token, fullName });
          const data = response.data;

          dispatch(
            login({
              isLogged: true,
              user: data.user || { email: user.email, displayName: user.displayName },
              provider: AuthProviders.email,
            })
          );

          // Limpiar storage
          window.localStorage.removeItem('emailForSignIn');
          window.localStorage.removeItem('fullNameForSignIn');

          navigate('/dashboard');
        }
      } catch (error) {
        onAuthError?.(error, 'Magic Link sign-in failed');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loginGoogle = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/calendar',
    redirect_uri: window.location.origin,
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      try {
        const backendResponse = await axios.post('/auth/google', {
          code: codeResponse.code,
        });
        dispatch(
          login({
            isLogged: true,
            user: backendResponse.data.user,
            provider: AuthProviders.google,
          })
        );
        navigate('/dashboard');
      } catch (error) {
        onAuthError?.(error, 'Google Login failed');
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => onAuthError?.(error, 'Google Login popup failed'),
  });

  return {
    isLoading,
    sendMagicLink,
    completeMagicLinkSignIn,
    loginGoogle,
  };
};
