import { useSession } from 'next-auth/react';
import { useState } from 'react';
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

  const uploadPost = async (e: Event) => {
    e.preventDefault();
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
        className="absolute -bottom-2 right-4 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        type="submit"
        onClick={uploadPost}
        disabled={isDiabled}
      >
        {isLoading && <span className="fas fa-spinner fa-spin mr-1"></span>}
        POST
      </button>
    </form>
  );
}

export default Form;
