import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/solid';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useSetRecoilState } from 'recoil';
import { commentModalState } from '../atoms/modalAtom';
import { postIdState } from '../atoms/postIdAtom';
import { db, storage } from '../firebase';

export interface PostProps {
  id: string; // key for the posts[key] = value:(data())
  data: () => {
    id: string;
    name: string;
    username: string;
    userImage: string;
    image: string;
    text: string;
    timestamp: string;
  };
}

interface Props {
  post: PostProps;
}

export const PostComponent: React.FC<Props> = ({ post }) => {
  // if (post?.data()?.userImage) {
  //   post.data().userImage =
  //     'https://avatars.githubusercontent.com/u/20208332?s=40&v=4';
  // }
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const setOpen = useSetRecoilState(commentModalState);
  const setPostId = useSetRecoilState(postIdState);

  // console.log(post.id);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', post.id, 'likes'),
      (snapshot: any) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex(
        (like: any) =>
          // @ts-ignore
          like.id === session?.user?.uid
      ) !== -1
    );
  }, [likes]);

  const handleLikePost = async () => {
    if (session) {
      if (hasLiked) {
        // @ts-ignore
        await deleteDoc(doc(db, 'posts', post.id, 'likes', session?.user?.uid));
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            post.id,
            'likes',
            // @ts-ignore
            session?.user?.uid
          ),
          {
            // @ts-ignore
            username: session?.user?.username,
          }
        );
      }
    } else {
      signIn();
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are your sure?')) {
      // delete the post likes collection
      // @ts-ignore
      // await deleteDoc(doc(db, 'posts', post.id, 'likes'));
      // delete store post document
      await deleteDoc(doc(db, 'posts', post.id));
      if (post.data().image) {
        // delete storage image
        await deleteObject(ref(storage, `posts/${post.id}/image`));
      }
    }
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        src={post.data().userImage}
        alt="user-img"
        className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
      />
      {/* right part */}
      <div className="w-[80%]">
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
            {' - '}
            <span className="text-sm sm:text-[15px] hover:underline">
              {/* @ts-ignore */}
              <Moment fromNow>{post.data().timestamp?.toDate()}</Moment>
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
        <>
          {post.data().image && (
            <img
              src={post.data().image}
              alt="post-img"
              className="rounded-2xl mr-2"
            />
          )}
        </>

        {/* icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <ChatIcon
            onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(post.id);
                setOpen(true);
              }
            }}
            className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100"
          />
          {
            // @ts-ignore
            session?.user?.uid === post.data().id && (
              <TrashIcon
                onClick={handleDeletePost}
                className="h-9 w-9 hover-effects p-2 hover:text-red-500 hover:bg-sky-100"
              />
            )
          }
          <div className="flex items-center">
            {hasLiked ? (
              <HeartSolidIcon
                onClick={handleLikePost}
                className="h-9 w-9 hover-effects p-2 hover:text-red-500 hover:bg-sky-100"
              />
            ) : (
              <HeartIcon
                onClick={handleLikePost}
                className="h-9 w-9 hover-effects p-2 hover:text-red-500 hover:bg-sky-100"
              />
            )}
            {likes.length > 0 && (
              <span className="text-xs">{likes.length}</span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};
