import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';
import Moment from 'react-moment';

interface Props {
  post: {
    data: () => {
      id: string;
      name: string;
      username: string;
      userImage: string;
      image: string;
      text: string;
      timestamp: string;
    };
  };
}

export const PostComponent: React.FC<Props> = ({ post }) => {
  // if (post?.data()?.userImage) {
  //   post.data().userImage =
  //     'https://avatars.githubusercontent.com/u/20208332?s=40&v=4';
  // }
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        src={post.data().userImage}
        alt="user-img"
        className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
      />
      {/* right part */}
      <div>
        {/* header */}
        <div className="flex items-center justify-between ">
          {/* user info */}
          <div className="flex items-center selection:space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.data().username} {'  '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {/* @ts-ignore */}
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icont */}
          {/* <DotsHorizontalIcon className="h-10 hover-effects w-10 hover:bg-sky-100 hover:text-sky-500 p-2" /> */}
        </div>

        {/* post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.data().text}
        </p>
        {/* post image */}
        {post.data().image ? (
          <img
            src={post.data().image}
            alt="post-img"
            className="rounded-2xl mr-2"
          />
        ) : (
          <></>
        )}

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
