import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Moment from 'react-moment'
import { useRecoilState } from 'recoil'
import { IPost } from '../..'
import { modalState, postIdState } from '../../atoms/modalAtom'
import { auth, db } from '../../utils/firebase'

interface IProps {
  id: string
  post: IPost
  postPage: any
}

const Post: NextPage<IProps> = ({ id, post, postPage }) => {
  const [user] = useAuthState(auth)
  // remember: getter and setter
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const router = useRouter()

  const likePost = async () => {
    if (liked) {
      // unliking the post
      // @ts-ignore
      await deleteDoc(doc(db, 'posts', id, 'likes', user?.uid))
      setLiked(false)
    } else {
      // liking the post
      // @ts-ignore
      await setDoc(doc(db, 'posts', id, 'likes', user?.uid), {
        username: user?.displayName,
      })
      setLiked(true)
    }
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        //  @ts-ignore
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        //  @ts-ignore
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setLiked(
        //  @ts-ignore
        likes.findIndex((like) => like?.id === user?.uid) !== -1
      ),
    [likes]
  )

  return (
    <div
      className="flex cursor-pointer border-b border-gray-700 p-3"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="mr-4 h-11 w-11 rounded-full"
        />
      )}
      <div className="flex w-full flex-col space-y-2">
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="mr-4 h-11 w-11 rounded-full"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="group inline-block">
              <h4
                className={`text-[15px] font-bold text-[#d9d9d9] group-hover:underline sm:text-base ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && 'ml-1.5'}`}
              >
                @{post?.tag}
              </span>
            </div>{' '}
            ·{' '}
            <span className="text-sm hover:underline sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className="mt-0.5 text-[15px] text-[#d9d9d9] sm:text-base">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group ml-auto flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="mt-0.5 text-xl text-[#d9d9d9]">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="mr-2 max-h-[700px] rounded-2xl object-cover"
        />
        <div
          className={`flex w-10/12 justify-between text-[#6e767d] ${
            postPage && 'mx-auto'
          }`}
        >
          <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation()
              setPostId(id)
              setIsOpen(true)
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="text-sm group-hover:text-[#1d9bf0]">
                {comments.length}
              </span>
            )}
          </div>

          {user?.uid === post?.id ? (
            <div
              className="group flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation()
                deleteDoc(doc(db, 'posts', id))
                router.push('/')
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="group flex items-center space-x-1">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation()
              likePost()
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {/* @ts-ignore */}
            {likes?.docs?.length > 0 && (
              <span
                className={`text-sm group-hover:text-pink-600 ${
                  liked && 'text-pink-600'
                }`}
              >
                {likes?.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
