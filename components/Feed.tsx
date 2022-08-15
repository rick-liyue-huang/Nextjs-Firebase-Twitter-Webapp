import { SparklesIcon } from '@heroicons/react/outline';
import React from 'react';
import { InputComponent } from './Input';

export const FeedComponent: React.FC = () => {
  return (
    <div className="xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl border-gray-200">
      {/* Feed Head */}
      <div className="flex px-3 py-2 sticky top-0 z-50 bg-white border-b border-gray-300">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hover-effects flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>

      {/* Feed Input */}
      <InputComponent />
    </div>
  );
};
