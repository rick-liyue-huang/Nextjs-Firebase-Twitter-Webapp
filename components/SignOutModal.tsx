import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import { signOutState } from '../atoms/signOutAtom';

export const SignOutModal: React.FC = () => {
  const [open, setOpen] = useRecoilState(signOutState);
  const { data: session } = useSession();

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        className="absolute bottom-10 left-10 w-[20%] h-[12%] bg-gray-50 rounded-xl"
      >
        {session && (
          <div className="border-none px-3 py-1 flex flex-col items-center justify-center">
            <div className="pb-2 text-sky-500">User: {session?.user?.name}</div>
            <button
              className=" bg-sky-500 text-white rounded-full px-3 py-1.5"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
