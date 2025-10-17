import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignin } from '@/hooks/apis/auth/useSignin';

import SigninCard from './SigninCard';

export interface SignInData {
  email: string;
  password: string;
}

export interface ValidationError {
  message: string;
}

const SigninContainer: React.FC = () => {
  const navigate = useNavigate();

  const [signinForm, setSigninForm] = useState<SignInData>({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  const { isPending, isSuccess, error, signinMutation } = useSignin();

  async function onSigninFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Signin form submitted', signinForm);

    if (!signinForm.email || !signinForm.password) {
      console.error('All fields are required');
      setValidationError({ message: 'All fields are required' });
      return;
    }

    setValidationError(null);

    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  return (
    <SigninCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      validationError={validationError}
      onSigninFormSubmit={onSigninFormSubmit}
    />
  );
};

export default memo(SigninContainer);
