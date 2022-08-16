import React from 'react';
import { useRecoilState } from 'recoil';
import { commentModalState } from '../atoms/modalAtom';

export const CommentModal: React.FC = () => {
  const [open, setOpen] = useRecoilState(commentModalState);

  return (
    <div>
      <h1>Comment Form</h1>
      {open && <h1>modal is open</h1>}
    </div>
  );
};
