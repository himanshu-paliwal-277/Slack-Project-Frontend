import React, { memo } from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center w-full h-[80px] bg-black text-white">
      <p>© 2025 My App</p>
    </footer>
  );
};

export default memo(Footer);
