import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout as logoutThunk, clearAuth, setSessionExpiredNotice } from '@/redux/auth/auth.slice';
import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sileo } from 'sileo';
import { auth as firebaseAuth } from '@/context/firebase';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';

/**
 * useSession Hook
 * 
 * Provides session management, authentication status, and cross-tab synchronization.
 * Listens to Firebase auth state changes in real-time to detect session expiration
 * without waiting for an API call to fail.
 */
export const useSession = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const wasLoggedIn = useRef(false);

  const logout = useCallback(async (isExternal = false) => {
    try {
      if (isExternal) {
        dispatch(clearAuth());
        sileo.info({
          title: 'Sesión Finalizada',
          description: 'Tu sesión se ha cerrado en otra pestaña. Inicia Sesión de nuevo para continuar.',
          fill: 'var(--sileo-update-bg)',
          duration: 5000,
        });
      } else {
        // Call logout thunk (handles API + state clearing)
        await dispatch(logoutThunk());
      }
      
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      dispatch(clearAuth());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  // Cross-tab logout detection via localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // detect if 'user' or 'authProvider' was removed (logout in another tab)
      if (
        (event.key === 'user' || event.key === 'authProvider') &&
        event.oldValue &&
        !event.newValue
      ) {
        logout(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [logout]);

  // Real-time Firebase auth state detection
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && wasLoggedIn.current) {
        // Firebase user became null while we were logged in → session expired
        dispatch(setSessionExpiredNotice(true));
        dispatch(clearAuth());
        navigate('/login');
      }
      wasLoggedIn.current = !!user;
    });

    const unsubToken = onIdTokenChanged(firebaseAuth, (user) => {
      if (!user && wasLoggedIn.current) {
        // Token was revoked or expired and couldn't be refreshed
        dispatch(setSessionExpiredNotice(true));
        dispatch(clearAuth());
        navigate('/login');
      }
    });

    return () => {
      unsubAuth();
      unsubToken();
    };
  }, [dispatch, navigate]);

  return {
    isLogged: auth.isLogged,
    user: auth.user,
    authProvider: auth.authProvider,
    status: auth.isLogged ? 'authenticated' : 'unauthenticated',
    logout: () => logout(false),
  };
};
