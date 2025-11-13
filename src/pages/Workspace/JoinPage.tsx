import { Loader2Icon } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VerificationInput from 'react-verification-input';

import { Button } from '@/components/ui/button';
import { useJoinWorkspaceRequest } from '@/hooks/apis/workspaces/useJoinWorkspace';
import { useAuth } from '@/hooks/context/useAuth'; // ✅ custom hook to access AuthContext
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

const JoinPage: React.FC = () => {
  const { workspaceId } = useParams();
  const { currentWorkspace } = useCurrentWorkspace();
  const navigate = useNavigate();
  const { auth } = useAuth();

  console.log('current workspace in JoinPage:', currentWorkspace);

  const { joinWorkspaceMutation } = useJoinWorkspaceRequest(workspaceId || '');
  const [isJoining, setIsJoining] = useState(false);

  // ✅ Redirect unauthenticated users
  useEffect(() => {
    if (!auth?.token && !auth?.isLoading) {
      navigate(`/auth/signin?redirect=/workspaces/join/${workspaceId}`);
    }
  }, [auth, navigate, workspaceId]);

  async function handleAddMemberToWorkspace(joinCode: string) {
    console.log('Adding member to workspace', joinCode);
    try {
      setIsJoining(true);
      await joinWorkspaceMutation(joinCode);
      navigate(`/workspaces/${workspaceId}/channels/${currentWorkspace?.channels[0]}`);
    } catch (error) {
      console.log('Error in adding member to workspace', error);
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <div className="relative h-[100dvh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm">
      {/* ✅ Loading overlay */}
      {isJoining && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-[3px] bg-white/60">
          <Loader2Icon className="animate-spin w-10 h-10 text-blue-600" />
          <p className="mt-3 text-sm font-medium text-gray-600">Joining workspace...</p>
        </div>
      )}

      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex flex-col gap-y-2 items-center">
          <h1 className="font-bold text-3xl">Join Workspace</h1>
          <p>Enter the code you received to join the workspace</p>
        </div>

        <VerificationInput
          onComplete={handleAddMemberToWorkspace}
          length={6}
          classNames={{
            container: 'flex gap-x-2',
            character:
              'h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            characterInactive: 'bg-muted',
            characterFilled: 'bg-white text-black',
            characterSelected: 'bg-white text-black',
          }}
          autoFocus
          // disabled={isJoining}
        />
      </div>

      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" disabled={isJoining}>
          <Link to={`/`}>Go to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default memo(JoinPage);
