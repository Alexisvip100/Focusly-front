import axios from 'axios';

export const useLoginErrorHandler = () => {
  const handleError = (error: unknown, context: string) => {
    if (axios.isAxiosError(error)) {
      alert(`${context}: ` + (error.response?.data?.message || error.message));
    } else if (error instanceof Error) {
      if ('code' in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firebaseError = error as any;
        if (firebaseError.code === 'auth/email-already-in-use') {
          alert('Este correo ya está registrado. Intenta iniciar sesión.');
        } else if (
          firebaseError.code === 'auth/user-not-found' ||
          firebaseError.code === 'auth/wrong-password' ||
          firebaseError.code === 'auth/invalid-credential'
        ) {
          alert('Credenciales incorrectas.');
        } else {
          alert(`${context}: ` + error.message);
        }
      } else {
        alert(`${context}: ` + error.message);
      }
    } else {
      alert(`${context}: Ocurrió un error desconocido`);
    }
  };

  return { handleError };
};
