import { useState, memo } from 'react';

import Image from 'next/image';
import { PostType } from '../types/Post';

import { Avatar, IconButton } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import { useRecoilState } from 'recoil';
import { handlePostState, getPostState } from '../atoms/postAtoms';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { modalState, modalTypeState } from '../atoms/modalAtoms';
import TimeAgo from 'timeago-react';
import { useSession } from 'next-auth/react';

function Post({ post, modalPost }: { post: PostType; modalPost?: boolean }) {
  const LIMIT_POST_LENGTH = 150;

  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const truncate = (string: string, n: number) =>
    string?.length > n ? (
      <div>
        {string.slice(0, n - 1)}{' '}
        <span className="text-blue-500">...read more</span>
      </div>
    ) : (
      string
    );

  const deletePost = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/posts/${post._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    setHandlePost(true);
    setIsLoading(false);
    setModalOpen(false);
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? 'rounded-r-lg' : 'rounded-lg'
      } space-y-2 p-2 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div
          className={`px-2.5 break-all md:break-normal space-y-5 !mb-4 ${
            post.input.length > LIMIT_POST_LENGTH && 'cursor-pointer'
          }  `}
        >
          {modalPost || showInput ? (
            <div
              onClick={() => setShowInput(false)}
              className={`${
                modalPost &&
                post.input.length > LIMIT_POST_LENGTH &&
                'overflow-y-scroll max-h-[60vh]'
              }`}
            >
              {post.input}{' '}
              {post.input.length > LIMIT_POST_LENGTH && !modalPost && (
                <span className="text-blue-500">...read less</span>
              )}
            </div>
          ) : (
            <div
              onClick={() => setShowInput(true)}
              className={`${
                modalPost &&
                post.input.length > LIMIT_POST_LENGTH &&
                'overflow-y-scroll max-h-[60vh]'
              }`}
            >
              {truncate(post.input, LIMIT_POST_LENGTH)}
            </div>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <Image
          width="100%"
          height="100%"
          layout="responsive"
          priority
          src={post.photoUrl}
          alt={post.input}
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType('gifYouUp');
            setPostState(post);
          }}
        />
      )}

      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && 'text-blue-500'}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button
            className="postButton focus:text-red-400"
            onClick={deletePost}
          >
            {isLoading ? (
              <svg
                role="status"
                className="inline  w-4 h-4 text-red-400 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <DeleteRoundedIcon />
            )}

            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postButton ">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(Post);
