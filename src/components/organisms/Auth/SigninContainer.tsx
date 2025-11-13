import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/'; // ✅ handle redirect

  const [signinForm, setSigninForm] = useState<SignInData>({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const { isPending, isSuccess, error, signinMutation } = useSignin();

  async function onSigninFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!signinForm.email.trim() || !signinForm.password.trim()) {
      setValidationError({ message: 'All fields are required' });
      return;
    }

    setValidationError(null);

    try {
      await signinMutation({
        email: signinForm.email,
        password: signinForm.password,
      });
    } catch (err) {
      console.error('Sign-in error:', err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate(redirectTo, { replace: true });
    }
  }, [isSuccess, navigate, redirectTo]);

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
