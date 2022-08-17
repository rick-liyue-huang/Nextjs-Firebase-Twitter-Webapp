import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { useRecoilState, useRecoilValue } from 'recoil';
import { commentModalState } from '../atoms/modalAtom';
import { postIdState } from '../atoms/postIdAtom';
import { db } from '../firebase';
import { PostProps } from './Post';

export const CommentModal: React.FC = () => {
  const [open, setOpen] = useRecoilState(commentModalState);
  const postId = useRecoilValue(postIdState);
  const [post, setPost] = useState<PostProps | null>(null);
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const filePickRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // console.log('session: --', session);

  useEffect(() => {
    const docRef = doc(db, 'posts', postId);
    onSnapshot(docRef, (snapshot: any) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  // communicate with firebase
  const handleSendComment = async () => {
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment: input,
      name: session?.user?.name,
      // @ts-ignore
      username: session?.user?.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setInput('');
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 rounded-xl shadow-md "
        >
          <div className="p-2">
            <div className="border-b border-gray-200 py-1 px-1">
              <div className="hover-effects w-9 h-9 flex items-center justify-center">
                <XIcon
                  onClick={() => setOpen(false)}
                  className="h-[22px] text-gray-600"
                />
              </div>
            </div>

            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
              <img
                src={post?.data()?.userImage}
                alt="user-img"
                className="h-11 w-11 rounded-full hover:brightness-95 mr-4"
              />
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
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            {/* replay comment */}
            <div className="flex p-3 space-x-3">
              <img
                src={session?.user?.image as string}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="tweet your reply"
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-400 tracking-wider min-h-[50px] text-gray-700"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex ">
                    <div
                      className=""
                      onClick={() => filePickRef?.current?.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hover-effects p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickRef}
                        onChange={handleAddImageRef}
                      /> */}
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 hover-effects p-2 text-sky-500  hover:bg-sky-100" />
                  </div>
                  <button
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                    onClick={handleSendComment}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
