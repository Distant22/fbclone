import React from 'react'
import StoryCard from './StoryCard'


const stories = [
    {
        name:"你",
        src: "/yourstory.jpg",
        profile: "/blank0804.jpeg"
    },
    {
        name:"Tyler Joseph",
        src: "/tyler0804.jpg",
        profile: "/tylerbanner0804.jpg"
    },
    {
        name:"Martin Garrix",
        src: "/martin0804.jpg",
        profile: "/martinbanner0804.jpg"
    },
    {
        name:"五月天 阿信",
        src: "/Mayday0804.jpg",
        profile: "/maydaybanner0804.jpg"
    },
    {
        name:"Kayne West",
        src: "/ye0804.jpg",
        profile: "/yebanner0804.jpg"
    },
]

function Stories() {
  return<div className = "flex justify-center space-x-3 mx-auto">
      {stories.map((story) => (
        <StoryCard 
        key={story.src}
        name={story.name}
        src={story.src}
        profile={story.profile} />
      ))}
  </div>
}

export default Stories
