import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/auth/auth.slice';

export const useProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(user?.name || 'Alex Morgan');
  const [jobTitle, setJobTitle] = useState('Product Designer');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@example.com');
  const [bio, setBio] = useState(
    'Focused on building intuitive user interfaces and optimizing productivity workflows.'
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };


  const cancelEdit = () => {
    navigate('/dashboard');
  };

  return {
    user,
    fullName,
    setFullName,
    jobTitle,
    setJobTitle,
    email,
    setEmail,
    bio,
    setBio,
    handleLogout,
    getInitials,
    cancelEdit,
  };
};
