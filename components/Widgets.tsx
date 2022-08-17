import { SearchIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { ArticleProp, UserProps } from '../pages';
import { NewsComponent } from './News';

interface Props {
  newsResults: ArticleProp[];
  usersResults: UserProps[];
}

export const WidgetsCompont: React.FC<Props> = ({
  newsResults,
  usersResults,
}) => {
  const [aritcleNumber, setaritcleNumber] = useState(3);
  const [followingUsersNumber, setFollowingUsersNumber] = useState(3);

  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
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
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Whats happened</h4>

        <AnimatePresence>
          {newsResults.slice(0, aritcleNumber).map((article: ArticleProp) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <NewsComponent article={article} />
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setaritcleNumber(aritcleNumber + 3)}
        >
          Show More
        </button>
      </div>

      {/* following users */}
      <div className="sticky top-20 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <AnimatePresence>
          {usersResults.slice(0, followingUsersNumber).map((user) => (
            <motion.div
              key={user.email}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-200">
                <img
                  className="rounded-full"
                  width={'40'}
                  src={user.picture.thumbnail}
                  alt={user.name.first}
                />
                <div className="truncate ml-4 leading-5">
                  <h4 className="font-bold hover:underline text-[14px] truncate">
                    {user.login.username}
                  </h4>
                  <h5 className="text-[13px] text-gray-500 truncate">
                    {user.name.first + ' ' + user.name.last}
                  </h5>
                </div>
                <button className="ml-auto bg-sky-500 text-white rounded-full px-3 py-1.5">
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setFollowingUsersNumber(followingUsersNumber + 3)}
        >
          Show More
        </button>
      </div>
    </div>
  );
};
