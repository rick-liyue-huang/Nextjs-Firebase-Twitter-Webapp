import { SparklesIcon } from '@heroicons/react/outline';
import React from 'react';
import { InputComponent } from './Input';
import { PostComponent } from './Post';

export const FeedComponent: React.FC = () => {
  const posts = [
    {
      id: '1',
      name: 'post one',
      username: 'user one',
      userImg: 'https://avatars.githubusercontent.com/u/20208332?s=40&v=4',
      img: 'https://images.unsplash.com/photo-1657299170932-e75407883a6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
      text: 'text one',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      name: 'post two',
      username: 'user two',
      userImg: 'https://avatars.githubusercontent.com/u/20208332?s=40&v=4',
      img: 'https://images.unsplash.com/photo-1657299142018-4f7f33aea18c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      text: 'text two',
      timestamp: '3 hours ago',
    },
  ];

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

      {/* Feed Post */}
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};
