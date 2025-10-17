import { LucideLoader2, TriangleAlert } from 'lucide-react';
import React, { memo } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import type { SignUpData, ValidationError } from './SignupContainer';

interface IProps {
  signupForm: SignUpData;
  setSignupForm: (signupForm: SignUpData) => void;
  validationError: ValidationError | null;
  onSignupFormSubmit: (e: React.FormEvent) => void;
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
}

const SignupCard: React.FC<IProps> = ({
  signupForm,
  setSignupForm,
  validationError,
  onSignupFormSubmit,
  error,
  isPending,
  isSuccess,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription className="mb-2">Sign up to access your account</CardDescription>
        {validationError && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <TriangleAlert className="size-5" />
            <p>{validationError.message}</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <TriangleAlert className="size-5" />
            <p>{error.message}</p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-800/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary">
            <FaCheck className="size-4" />
            <p>Successfully signed up.</p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={(e) => onSignupFormSubmit(e)}>
          <Input
            placeholder="Email"
            required
            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
            value={signupForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder="Your userName"
            required
            onChange={(e) => setSignupForm({ ...signupForm, userName: e.target.value })}
            value={signupForm.userName}
            type="text"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
            value={signupForm.password}
            type="password"
            disabled={isPending}
          />
          <Input
            placeholder="Confirm Password"
            required
            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
            value={signupForm.confirmPassword}
            type="password"
            disabled={isPending}
          />
          <Button disabled={isPending} size="lg" type="submit" className="w-full">
            {isPending ? <LucideLoader2 className="animate-spin ml-2 w-16 h-16" /> : 'Continue'}
          </Button>
        </form>

        <Separator className="my-5" />

        <p className="text-sm text-muted-foreground mt-4">
          Already have an account ?{' '}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate('/auth/signin')}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default memo(SignupCard);
