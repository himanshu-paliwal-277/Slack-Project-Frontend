import React, { memo } from 'react';

interface IProps {
  children: React.ReactNode;
}
const Auth: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-slack">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
};

export default memo(Auth);
