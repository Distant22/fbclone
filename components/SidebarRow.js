import React from 'react'
import Image from 'next/image'

function SidebarRow({src,Icon,title}) {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
    
    {/* SidebarRow是一個method, src取得使用者頭貼，Icon取得左欄位各功能的圖像，title取回文字，並做大小、顏色處理 */}
    <div className="row"></div>
      {src && (
        <Image
            className="rounded-full"
            src={src}
            width={30}
            height={30}
            layout="fixed"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  )
}

export default SidebarRow
