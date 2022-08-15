import { SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { ArticleProp } from '../pages';
import { NewsComponent } from './News';

interface Props {
  newsResults: ArticleProp[];
}

export const WidgetsCompont: React.FC<Props> = ({ newsResults }) => {
  const [aritcleNumber, setaritcleNumber] = useState(3);

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[95%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-60 absolute left-5" />
          <input
            type="text"
            placeholder="search twitter"
            className="pl-11 rounded-full border-gray-700 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 w-full"
          />
        </div>
      </div>

      {/* News */}
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[95%]">
        <h4 className="font-bold text-xl px-4">What's happened</h4>
        {newsResults.slice(0, aritcleNumber).map((article: ArticleProp) => (
          <NewsComponent key={article.title} article={article} />
        ))}
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setaritcleNumber(aritcleNumber + 3)}
        >
          Show More
        </button>
      </div>
    </div>
  );
};
