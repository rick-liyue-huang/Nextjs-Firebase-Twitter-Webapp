import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { db, storage } from '../firebase';

export const InputComponent: React.FC = () => {
  // after sign in get the session information
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState();

  const filePickRef = useRef<HTMLInputElement | null>(null);

  // console.log('session: ---', session);

  // todo?
  if (session?.user?.image) {
    session.user.image =
      'https://avatars.githubusercontent.com/u/20208332?s=40&v=4';
  }

  const handleSendPost = async () => {
    if (loading) return;
    setLoading(true);

    // begin the post sending
    const docRef = await addDoc(collection(db, 'posts'), {
      // @ts-ignore
      id: session?.user?.uid,
      text: input,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
      name: session?.user?.name,
      // @ts-ignore
      username: session?.user?.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedImg) {
      await uploadString(imageRef, selectedImg, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        });
      });
    }

    setInput('');
    setSelectedImg(undefined);
    setLoading(false);
  };

  const handleAddImageRef = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      await reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent: any) => {
      // console.log(readerEvent.target.result);
      const imageData = await readerEvent.target.result;
      // console.log('imageData: ---', imageData);
      await setSelectedImg(imageData);
    };
  };

  return (
    <>
      {session && session.user && session.user.image && (
        <div className="flex border-b border-gray-200 p-3 space-x-3 dark:bg-black">
          <img
            src={session.user.image}
            alt="user-img"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="input something..."
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wider min-h-[50px] text-gray-700 dark:bg-black"
              ></textarea>
            </div>
            {selectedImg && (
              <div className="relative">
                <XIcon
                  className="text-sky-600 absolute h-7 cursor-pointer shadow-md shadow-white rounded-full"
                  onClick={() => setSelectedImg(undefined)}
                />
                <img src={selectedImg} alt="image" />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex ">
                    <div
                      className=""
                      onClick={() => filePickRef?.current?.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hover-effects p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickRef}
                        onChange={handleAddImageRef}
                      />
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 hover-effects p-2 text-sky-500  hover:bg-sky-100" />
                  </div>
                  <button
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                    onClick={handleSendPost}
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
