import React from 'react';
import { ArticleProp } from '../pages';

interface Props {
  article: ArticleProp;
}

export const NewsComponent: React.FC<Props> = ({ article }) => {
  return (
    <a href={article.url} target="_blank">
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold ">{article.title}</h6>
          <p className="text-xs font-medium text-gray-500">
            {article.source.name}
          </p>
        </div>
        <img
          src={article.urlToImage}
          alt={article.title}
          className="rounded-xl"
          width="70"
        />
      </div>
    </a>
  );
};
