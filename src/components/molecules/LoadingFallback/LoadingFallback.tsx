import { Loader2 } from 'lucide-react';
import React, { memo } from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default memo(LoadingFallback);
