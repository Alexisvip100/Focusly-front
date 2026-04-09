import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateUser as updateReduxUser } from '@/redux/auth/auth.slice';
import axios from '@/api/axiosInstance';

interface UseProfileCompletionProps {
  onNext: () => void;
}

export const useProfileCompletion = ({ onNext }: UseProfileCompletionProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [jobTitle, setJobTitle] = useState((user?.jobTitle as string) || '');
  const [bio, setBio] = useState((user?.bio as string) || '');
  const [profileImage, setProfileImage] = useState(user?.picture || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // In a real scenario, you'd upload to S3/Cloudinary here and get a remote URL
    }
  };

  const handleContinue = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const updateData = {
        name: fullName,
        jobTitle,
        bio,
        picture: profileImage
      };

      // Send to backend
      const response = await axios.patch(`/users/${user.id}`, updateData);
      
      // Update Redux with the response from server
      dispatch(updateReduxUser(response.data));
      
      onNext();
    } catch (error) {
      console.error('Error saving profile:', error);
      // Optional: show toast error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    jobTitle,
    setJobTitle,
    bio,
    setBio,
    profileImage,
    fileInputRef,
    isLoading,
    handleImageClick,
    handleFileChange,
    handleContinue
  };
};
