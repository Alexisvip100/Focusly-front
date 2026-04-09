export enum AuthProviders {
  google = 'google',
  email = 'email',
}

export interface User {
  email?: string;
  name?: string;
  picture?: string;
  [key: string]: unknown;
}

export type LoginProps = {
  isLogged: boolean;
  user: User | null;
  authProvider: AuthProviders | null;
  token: string | null;
};

export interface UserEntity {
  id: string;
  email: string;
  password_hash?: string;
  auth_provider: AuthProviders;
  subscription_status: string;
  last_sync_at: string;
  created_at: string;
}
