import React from 'react';
import { useParams } from 'react-router-dom';

const Members: React.FC = () => {
  const { workspaceId, memberId } = useParams<{
    workspaceId: string;
    memberId: string;
  }>();

  return (
    <div className="members-page">
      <h1>Members Page</h1>
      <p>Workspace ID: {workspaceId}</p>
      <p>Member ID: {memberId}</p>
    </div>
  );
};

export default Members;
