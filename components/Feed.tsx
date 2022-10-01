import Input from './Input';
import { PostType } from '../types/Post';
import { useRecoilState } from 'recoil';
import { handlePostState, useSSRPostsState } from '../atoms/postAtoms';
import { useState, useEffect } from 'react';
import Post from './Post';

function Feed({ posts }: { posts: PostType[] }) {
  const [realtimePosts, setRealtimePosts] = useState<PostType[]>([]);
  const [handlePost, setHandlePost] = useRecoilState<boolean>(handlePostState);
  const [useSSRPosts, setUseSSRPosts] =
    useRecoilState<boolean>(useSSRPostsState);

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    if (handlePost) {
      fetchPosts();
    }
  }, [handlePost]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {!useSSRPosts
        ? realtimePosts.map(post => <Post key={post._id} post={post} />)
        : posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  );
}

export default Feed;
