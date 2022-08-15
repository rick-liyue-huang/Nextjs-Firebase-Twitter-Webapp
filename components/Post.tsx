import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';

interface Props {
  post: {
    id: string;
    name: string;
    username: string;
    userImg: string;
    img: string;
    text: string;
    timestamp: string;
  };
}

export const PostComponent: React.FC<Props> = ({ post }) => {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        src={post.userImg}
        alt="user-img"
        className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
      />
      {/* right part */}
      <div>
        {/* header */}
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className="flex items-center selection:space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
            </span>
          </div>
          {/* dot icont */}
          <DotsHorizontalIcon className="h-10 hover-effects w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>
        {/* post image */}
        <img src={post.img} alt="post-img" className="rounded-2xl mr-2" />
        {/* icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <ChatIcon className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hover-effects p-2 hover:text-red-500 hover:bg-sky-100" />
          <HeartIcon className="h-9 w-9 hover-effects p-2 hover:text-red-500 hover:bg-sky-100" />
          <ShareIcon className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
        <div></div>
      </div>
    </div>
  );
};
