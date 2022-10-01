import { atom } from 'recoil';
import { PostType } from '../types/Post';

export const handlePostState = atom({
  key: 'handlePostState',
  default: false,
});

export const getPostState = atom({
  key: 'getPostState',
  default: {} as PostType,
});

export const useSSRPostsState = atom({
  key: 'useSSRPostsState',
  default: true,
});
