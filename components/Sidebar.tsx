import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';

export const Sidebar: React.FC = () => {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      {/* Twitter Logo */}
      <div className="hover-effects p-0 hover:bg-blue-100 xl:p-1">
        <Image
          width={'50px'}
          height={'50px'}
          src={
            'https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
          }
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text={'Home'} Icon={HomeIcon} active />
        <SidebarMenuItem text={'Explore'} Icon={HashtagIcon} />
        <SidebarMenuItem text={'Notifications'} Icon={BellIcon} />
        <SidebarMenuItem text={'Messages'} Icon={InboxIcon} />
        <SidebarMenuItem text={'Bookmarks'} Icon={BookmarkIcon} />
        <SidebarMenuItem text={'Lists'} Icon={ClipboardIcon} />
        <SidebarMenuItem text={'Profile'} Icon={UserIcon} />
        <SidebarMenuItem text={'More'} Icon={DotsCircleHorizontalIcon} />
      </div>

      {/* Buttons */}
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline-block">
        Tweet
      </button>

      {/* Profile Button */}
      <div className="hover-effects text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src="https://avatars.githubusercontent.com/u/20208332?s=40&v=4"
          alt="user-image"
          className="h-10 w-10 rounded-full xl:mr-24"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Rick Huang</h4>
          <p className="text-gray-500">@richcoding</p>
        </div>
        <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
};
