import { SparklesIcon } from '@heroicons/react/outline'
import { NextPage } from 'next'
import { db } from '../../utils/firebase'
import Input from '../Input'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { IPost } from '../..'
import Post from '../Post'

const Feed: NextPage = () => {
  // better to use react-firebase-hooks so you don't have to set the state as it is done here
  const [posts, loading, error] = useCollection(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )
  return (
    <div className="max-w-2xl flex-grow border-l border-r border-gray-700 text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9 sticky top-0 z-50 flex items-center border-b border-gray-700 bg-black py-2 px-3 sm:justify-between">
        <h2 className="text-lg sm:text-xl">Home</h2>

        <div className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />

        {/* @ts-ignore */}
      <div className="pb-72">{posts?.docs.map((post: any) => {
        return (
          // @ts-ignore
         <Post key={post.id} id={post.id} post={post.data()}/>
        )
      })}</div>
    </div>
  )
}

export default Feed
