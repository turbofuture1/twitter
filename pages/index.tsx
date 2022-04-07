import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from '../components/Login'
import Modal from '../components/Modal'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
import Widgets from '../components/Widgets'

interface Props {
  trendingResults: any
  followResults: any
}

const Home: NextPage<Props> = ({trendingResults, followResults}) => {
  const [user] = useAuthState(auth)
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  if (!user) return <Login />

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export default Home

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
