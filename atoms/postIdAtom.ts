import { atom } from 'recoil';

export const postIdState = atom({
  key: 'postIdState',
  default: 'id', // must add default value for doc()
});
