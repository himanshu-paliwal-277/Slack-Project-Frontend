import { LucideLoader2, TriangleAlert } from 'lucide-react';
import React, { memo } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import type { SignInData, ValidationError } from './SigninContainer';

interface IProps {
  signinForm: SignInData;
  setSigninForm: (signinForm: SignInData) => void;
  validationError: ValidationError | null;
  onSigninFormSubmit: (e: React.FormEvent) => void;
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
}

const SigninCard: React.FC<IProps> = ({
  signinForm,
  setSigninForm,
  validationError,
  onSigninFormSubmit,
  error,
  isPending,
  isSuccess,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription className="mb-2">Sign in to access your account</CardDescription>
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
          <div className="bg-green-800/20 p-3 rounded-md flex items-center gap-x-3 text-sm text-primary">
            <FaCheck className="size-4" />
            <p>Successfully signed in</p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={(e) => onSigninFormSubmit(e)}>
          <Input
            placeholder="Email"
            onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
            value={signinForm.email}
            type="email"
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
            value={signinForm.password}
            type="password"
            disabled={isPending}
          />
          <Button disabled={isPending} size="lg" type="submit" className="w-full">
            {isPending ? <LucideLoader2 className="animate-spin ml-2 w-16 h-16" /> : 'Continue'}
          </Button>
        </form>

        <Separator className="my-5" />

        <p className="text-sm text-muted-foreground mt-4">
          Don't have an account ?{' '}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default memo(SigninCard);
