import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { auth } from '@/context/firebase';
import { API_BASE_URL } from '@/config/env.config';
import { AuthProviders } from '@/pages/Login/types/Login.types';

interface User {
  id: string;
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: unknown;
}

interface AuthState {
  isLogged: boolean;
  user: User | null;
  authProvider: AuthProviders | null;
  onboardingCompleted: boolean;
  sessionExpiredNotice: boolean;
}

type LogoutReason = 'manual' | 'expired';

const getInitialState = (): AuthState => {
  const user = localStorage.getItem('user');
  const authProvider = localStorage.getItem('authProvider');
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';

  if (user) {
    try {
      const parsedUser = JSON.parse(user) as User;
      return {
        isLogged: true,
        user: parsedUser,
        authProvider: authProvider as AuthProviders,
        onboardingCompleted,
        sessionExpiredNotice: false,
      };
    } catch (e) {
      console.error('[DEBUG] authSlice: Error parsing user from localStorage', e);
    }
  }

  return {
    isLogged: false,
    user: null,
    authProvider: null,
    onboardingCompleted,
    sessionExpiredNotice: false,
  };
};

export const logout = createAsyncThunk<void, LogoutReason | undefined>(
  'auth/logout',
  async (reason = 'manual', { dispatch, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const userId = state.auth.user?.id;

      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(setSessionExpiredNotice(reason === 'expired'));
      dispatch(clearAuth());
    }
  }
);

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: User;
        provider: AuthProviders;
        isLogged: boolean;
      }>
    ) => {
      state.isLogged = action.payload.isLogged;
      state.user = action.payload.user;
      state.authProvider = action.payload.provider;
      state.sessionExpiredNotice = false;

      localStorage.setItem('authProvider', action.payload.provider);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearAuth: (state) => {
      state.isLogged = false;
      state.user = null;
      state.authProvider = null;

      localStorage.removeItem('user');
      localStorage.removeItem('authProvider');
    },
    setSessionExpiredNotice: (state, action: PayloadAction<boolean>) => {
      state.sessionExpiredNotice = action.payload;
    },
    dismissSessionExpiredNotice: (state) => {
      state.sessionExpiredNotice = false;
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
      localStorage.setItem('onboardingCompleted', 'true');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const {
  login,
  clearAuth,
  setSessionExpiredNotice,
  dismissSessionExpiredNotice,
  completeOnboarding,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
