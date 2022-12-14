import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { useRef } from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes  } from "firebase/storage";

function InputBox() {

  const {data: session} = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  //preventDefault可避免發文後自動refresh page   
  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    addDoc(collection(db, 'posts'), {
        message: inputRef.current.value,
        name: session.user.name,
        image: session.user.image,
        timestamp: serverTimestamp()
    }).then(docum => {
        // if(imageToPost){
        //     const uploadTask = ref(storage, `posts/${doc.id}`).putString(imageToPost,'data_url')

        //     removeImage()

        //     uploadTask.on(
        //         'state_change',
        //         null,
        //         (error) => console.error(error),
        //         () => {
        //             ref(storage, `posts`).child(doc.id).getDownloadURL().then(url => {
        //                 db.collection("posts").doc(doc.id).set({
        //                     postImage: url
        //                 }, {merge:true})
        //             })
        //         }
        //     )
        // }
        if (imageToPost) {
            const storageRef = ref(storage, `posts/${docum.id}`);

            const metadata = {
              contentType: 'image/png',
            };

            const uploadTask = uploadBytesResumable(storageRef, imageToPost, metadata); 

            uploadTask.on('state_change', null,
            (error) => {
              alert(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                 setDoc(doc(db, "posts", docum.id), { postImage:url }, { merge: true});
              });
            }
          )
          removeImage();
        };
    })

    inputRef.current.value = ""
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
        setImageToPost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        <div className="flex space-x-4 p-4 items-center">
            <Image 
                className="rounded-full"
                src={session.user.image}
                width={40}
                height={40}
                layout="fixed"
            />
            <form className="flex flex-1">
                <input
                    className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                    type="text"
                    ref={inputRef}
                    placeholder={`${session.user.name}，在想些什麼?`} 
                />
                <button hidden type='submit' onClick={sendPost}></button>
            </form>

            {imageToPost && (
                <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                    <img className="h-10 object-contain" src={imageToPost} alt="" />
                    <p className = "text-xs text-red-500 text-center">移除</p>
                </div>
            )}
        </div>

        <div className = "flex justify-evenly p-3 border-t">
            <div className="inputIcon">
                <VideoCameraIcon className='h-7 text-red-500' />
                <p className="text-xs sm:text-sm xl:text-base">直播視訊</p>
            </div>

            <div onClick = {() => filepickerRef.current.click()} className="inputIcon">
                <CameraIcon className='h-7 text-green-400' />
                <p className="text-xs sm:text-sm xl:text-base">相片 / 影片</p>
                <input ref={filepickerRef} onChange = {addImageToPost} type="file" hidden accept="image/*" />
            </div>

            <div className="inputIcon">
                <EmojiHappyIcon className='h-7 text-yellow-300' />
                <p className="text-xs sm:text-sm xl:text-base">感受 / 活動</p>
            </div>
        </div>
      
    </div>
  );
}

export default InputBox
