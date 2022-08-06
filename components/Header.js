import React from 'react'
import Image from 'next/image'
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
} from "@heroicons/react/solid";
import{
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";

import HeaderIcon from './HeaderIcon';
import { signOut, useSession } from 'next-auth/react';

function Header() {
  const {data: session} = useSession();

  return (

    // top-0, z-50: 讓圖案與搜尋欄平行; shadow-md: 加底線
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className = "flex items-center">
        <Image 
        src="https://links.papareact.com/5me"
        width={40}
        height={40}
        layout="fixed"
        />

        {/* ml = margin left; p = padding 填充; 詳見 https://ithelp.ithome.com.tw/articles/10228808 */}
        <div className = "flex ml-2 items-center rounded-full bg-gray-100 p-2">
            <SearchIcon className='h-6 text-gray-600' />

            {/* bg transparent 讓Search Facebook的白色底色可變成透明; outline-none讓點擊搜尋框時不會有黑色外框; md:inline-flex讓圖案隨網頁縮放調整大小 */}
            <input className = "hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text" 
            placeholder="搜尋 Facebook" />
        </div>
      </div>

      {/* Center */}

      {/* 詳見css justify-content & flex-grow */}
      <div className = "flex justify-center flex-grow">

        {/* flex:讓圖案以橫排排列; space-x-6:讓每個物件有足夠間隔; md=medium */}
        <div className="flex space-x-6 md:space-x-2">
            <HeaderIcon active Icon={HomeIcon} />
            <HeaderIcon Icon={FlagIcon} />
            <HeaderIcon Icon={PlayIcon} />
            <HeaderIcon Icon={ShoppingCartIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        {/* Profile pic */}
        <Image 
            onClick = { signOut }
            className = "rounded-full cursor-pointer"
            src = {session.user.image}
            width="40"
            height="40"
            layout="fixed"
        />

        {/* nowrap:不換行的意思; pr:padding right */}
        <p className="whitespace-nowrap font-semibold pr-3">{session.user.name}</p>
        <ViewGridIcon className = "icon" />
        <ChatIcon className = "icon" />
        <BellIcon className = "icon" />
        <ChevronDownIcon className = "icon" /> 
      </div>
    </div>
  )
}

export default Header
