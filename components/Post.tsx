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
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useSetRecoilState } from 'recoil';
import { commentModalState } from '../atoms/modalAtom';
import { postIdState } from '../atoms/postIdAtom';
import { db, storage } from '../firebase';
import { PostProps } from '../types';

interface Props {
  id: string;
  post: PostProps | null;
}

export const PostComponent: React.FC<Props> = ({ id, post }) => {
  // if (post?.data()?.userImage) {
  //   post.data().userImage =
  //     'https://avatars.githubusercontent.com/u/20208332?s=40&v=4';
  // }
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const setOpen = useSetRecoilState(commentModalState);
  const setPostId = useSetRecoilState(postIdState);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  // console.log(post.id);

  // deal with likes sub collection
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'likes'),
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

  // deal with comments sub collection
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'comments'),
      (snapshot: any) => {
        setComments(snapshot.docs);
      }
    );
  }, []);

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
            id,
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
      if (post?.data()?.image) {
        // delete storage image
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push('/');
    }
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        src={post?.data()?.userImage}
        alt="user-img"
        className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
      />
      {/* right part */}
      <div className="flex-1">
        {/* header */}
        <div className="flex items-center justify-between ">
          {/* user info */}
          <div className="flex items-center selection:space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data()?.username} {'  '}
            </span>
            {' - '}
            <span className="text-sm sm:text-[15px] hover:underline">
              {/* @ts-ignore */}
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icont */}
          {/* <DotsHorizontalIcon className="h-10 hover-effects w-10 hover:bg-sky-100 hover:text-sky-500 p-2" /> */}
        </div>

        {/* post text */}
        <p
          className="text-gray-800 text-[15px] sm:text-[16px] mb-2 dark:text-gray-100"
          onClick={() => router.push(`/posts/${id}`)}
        >
          {post?.data()?.text}
        </p>
        {/* post image */}
        <>
          {post?.data()?.image && (
            <img
              onClick={() => router.push(`/posts/${id}`)}
              src={post.data()?.image}
              alt="post-img"
              className="rounded-2xl mr-2"
            />
          )}
        </>

        {/* icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(true);
                }
              }}
              className="h-9 w-9 hover-effects p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-xs">{comments.length}</span>
            )}
          </div>

          {
            // @ts-ignore
            session?.user?.uid === post?.data()?.id && (
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
