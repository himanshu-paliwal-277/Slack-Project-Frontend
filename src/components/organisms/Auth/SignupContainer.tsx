import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignup } from '@/hooks/apis/auth/useSignup';

import SignupCard from './SignupCard';

export interface SignUpData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationError {
  message: string;
}

const SignupContainer: React.FC = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState<SignUpData>({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
  });

  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  const { isPending, isSuccess, error, signupMutation } = useSignup();

  async function onSignupFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Signup form submitted', signupForm);

    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword ||
      !signupForm.userName
    ) {
      console.error('All fields are required');
      setValidationError({ message: 'All fields are required' });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      console.error('Passwords do not match');
      setValidationError({ message: 'Passwords do not match' });
      return;
    }

    setValidationError(null);

    await signupMutation({
      email: signupForm.email,
      password: signupForm.password,
      userName: signupForm.userName,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <SignupCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      signupForm={signupForm}
      setSignupForm={setSignupForm}
      validationError={validationError}
      onSignupFormSubmit={onSignupFormSubmit}
    />
  );
};

export default memo(SignupContainer);
