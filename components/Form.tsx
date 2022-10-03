import { useSession } from 'next-auth/react';
import { MouseEventHandler, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtoms';
import { handlePostState } from '../atoms/postAtoms';

function Form() {
  const [input, setInput] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const isDiabled = !input.trim() && !photoUrl.trim();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const upload = async (event: Event): Promise<any> => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        username: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoading(false);
    setHandlePost(true);

    setModalOpen(false);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows={4}
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <input
        type="text"
        placeholder="Add a 'Unsplash' photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photoUrl}
        onChange={e => setPhotoUrl(e.target.value)}
      />

      <button
        disabled={isDiabled}
        type="button"
        onClick={(e: any) => upload(e)}
        className="font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1 items-center"
      >
        {isLoading && (
          <svg
            role="status"
            className="inline mr-2 mb-1 w-4 h-4 text-white animate-spin"
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
        )}
        Post
      </button>
    </form>
  );
}

export default Form;
