import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtoms';
import { connectToDatabase } from '../util/mongodb';

import { PostType } from '../types/Post';

function Home({ posts }: { posts: PostType[] }) {
  console.log('show posts in Home component', posts);

  const router = useRouter();
  const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalState);
  const [modalType, setModalType] = useRecoilState<string>(modalTypeState);
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //  * The user is not authenticated, handle it here.
  //     router.push('/home');
  //   },
  // });

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll space-y-4 md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context: any) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    };
  }

  // Get posts on SSR
  const { db } = await connectToDatabase();

  console.log('start get posts from index get server side props');

  const posts = await db.find({}).sort({ timestamp: -1 }).toArray();

  return {
    props: {
      session,
      posts: posts.map((post: PostType) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}
