import { useState } from 'react';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFullName(event.target.value);

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const clearCredentials = () => {
    // Ya no hay contraseñas que limpiar
  };

  return {
    email,
    setEmail,
    fullName,
    setFullName,
    isRegistering,
    setIsRegistering,
    handleEmailChange,
    handleFullNameChange,
    toggleRegister,
    clearCredentials,
  };
};
