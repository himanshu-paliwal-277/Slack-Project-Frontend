import React, { memo, useEffect, useState } from 'react';

const LoadingFallback: React.FC = () => {
  const [panelBasis, setPanelBasis] = useState<string>('20%');

  useEffect(() => {
    try {
      let panelSize: number | null = null;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.includes('workspace-resize')) {
          const storedData = localStorage.getItem(key);
          if (!storedData) continue;

          const parsed = JSON.parse(storedData);

          if (parsed?.layout && Array.isArray(parsed.layout)) {
            panelSize = parsed.layout[0]; // ex: 54.31
            console.log('Found panelSize:', panelSize);
            break;
          }
        }
      }

      if (panelSize !== null) {
        setPanelBasis(`${panelSize}%`);
      } else {
        console.log('Using default 20%');
      }
    } catch (e) {
      console.warn('Error reading resize data', e);
    }
  }, []);

  return (
    <div className="h-[100dvh] bg-ocean-bg">
      <div className="h-[50px]" />
      <div className="flex sm:h-[calc(100vh-50px)] h-full">
        <div className="w-[80px] h-full" />

        <div className="pb-4 pr-4 flex-1 flex">
          {/* FIXED: use flexBasis instead of width */}
          <div className="bg-[#19376d] rounded-l-lg" style={{ flexBasis: panelBasis }} />

          <div className="bg-white flex-1 rounded-r-lg" />
        </div>
      </div>
    </div>
  );
};

export default memo(LoadingFallback);
