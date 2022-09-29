import { PostType } from '../types/Post';

function Post({ post }: { post: PostType }) {
  return (
    <>
      <div>{post.input}</div>
      <img src={post.photoUrl} alt={post.input} />
    </>
  );
}

export default Post;
