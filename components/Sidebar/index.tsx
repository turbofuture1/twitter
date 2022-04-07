import { NextPage } from 'next'
import Image from 'next/image'
import { DotsHorizontalIcon, HomeIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline'
import SidebarLink from '../SidebarLink'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'

const Sidebar: NextPage = () => {
  const [user] = useAuthState(auth)
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      <div className="mt-4 mb-2.5 space-y-0.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md hover:bg-[#1a8cd8] xl:inline">
        Tweet
      </button>

      <div className="hoverAnimation mt-auto flex items-center justify-center text-[#d9d9d9] xl:ml-auto xl:-mr-5">
        <img
          className="h-10 w-10 rounded-full xl:mr-2.5"
          // @ts-ignore
          src={user?.photoURL}
          alt=""
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="text-sm">{user?.email}</h4>
          <p className="text-[#6e767d] ">@{user?.displayName}</p>
        </div>
        <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  )
}

export default Sidebar
