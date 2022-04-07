import { ArrowLeftIcon } from '@heroicons/react/outline'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { IPost } from '..'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import { auth, db } from '../utils/firebase'
import { NextPageContext } from 'next'
import Comment from '../components/Comment'
import Widgets from '../components/Widgets'

interface Props {
    trendingResults: any;
    followResults: any;
}

const PostPage: NextPage<Props> = ({trendingResults, followResults}) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [user] = useAuthState(auth)
  const [post, setPost] = useState<IPost>()
  const router = useRouter()
  const [comments, setComments] = useState([])
  const { id } = router.query

  useEffect(
    () =>
      // @ts-ignore
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        // @ts-ignore
        setPost(snapshot.data())
      }),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          // @ts-ignore
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        // @ts-ignore
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <div className="max-w-2xl flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
          <div className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-gray-700 bg-black px-1.5 py-2 text-xl font-semibold text-[#d9d9d9]">
            <div
              className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0"
              onClick={() => router.push('/')}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          {/* @ts-ignore */}
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  //   @ts-ignore
                  key={comment.id}
                  //   @ts-ignore
                  id={comment.id}
                  //   @ts-ignore
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context: NextPageContext) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )

  return {
    props: {
      trendingResults,
      followResults,
    },
  }
}
