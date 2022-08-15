import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import { ArticleProp } from '../pages';

interface Props {
  newsResults: ArticleProp[];
}

export const WidgetsCompont: React.FC<Props> = ({ newsResults }) => {
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-60 absolute left-5" />
          <input
            type="text"
            placeholder="search twitter"
            className="pl-11 rounded-full border-gray-700 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 w-[80%]"
          />
        </div>
      </div>

      {/* News */}
      {newsResults.map((article: ArticleProp) => (
        <p>{article.title}</p>
      ))}
    </div>
  );
};
