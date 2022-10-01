import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtoms';
import { connectToDatabase } from '../util/mongodb';

import { PostType } from '../types/Post';
import Widgets from '../components/Widgets';

function Home({ posts, articles }: { posts: PostType[]; articles: any[] }) {
  const [modalOpen, setModalOpen] = useRecoilState<boolean>(modalState);
  const [modalType, setModalType] = useRecoilState<string>(modalTypeState);

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll space-y-4 md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Script
        src="https://use.fontawesome.com/releases/v5.5.0/js/all.js"
        data-auto-replace-svg="nest"
      ></Script>
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
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

  const posts = await db.find({}).sort({ timestamp: -1 }).toArray();
  // https://newsapi.org/v2/top-headlines?country=us&apiKey=4c661d3aa0bb4399bdbb2511cce580e3
  // Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then(res => res.json());

  return {
    props: {
      session,
      articles: results.articles,
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
