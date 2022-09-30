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

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch('/api/posts', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     const responseData = await response.json();
  //     setRealtimePosts(responseData);
  //     // 여기서 setHandle을 해버리면 두번 랜더링 되는거 아닌가?
  //     // 왜냐면 Modal - Form 컴포넌트에서 이미 setHandlePost를 했으니깐...
  //     setHandlePost(false);
  //     // 이거는 useEffect따로 빼서 한번만 실행되게끔 해야겠는데
  //     setUseSSRPosts(false);
  //   };
  //   fetchPosts();
  // }, [handlePost]);

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
