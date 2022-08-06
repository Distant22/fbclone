
// import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
// import { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import React from 'react'
// import Post from "./Post"
// import Image from "next/image";

// function Posts() {

//     const[posts ,setPosts] = useState([]);

// //   const [realtimePosts] = useCollection(
// //     query(collection(db, 'posts'),orderBy('timestamp', 'desc'))
// //   )

//     useEffect(
//         () => 
//         onSnapshot(
//             query(collection(db, "posts"),orderBy("timestamp", "desc")),
//             snapshot => {
//                 setPosts(snapshot.docs);
//             }),[db]
//     )

//     console.log(posts)

//     return (
//         <div>
//             {posts.map((post) => {
//                 <Post
//                     key={post.id}
//                     name={post.data().name}
//                     message={post.data().message}
//                     email={post.data().email}
//                     timestamp={post.data().timestamp}
//                     image={post.data().image}
//                     postImage={post.data().postImage}
//                 />
//                 console.log(post.data().name)
//                 console.log(post.data().message)
//             })}

//         </div>
//     )
// }

// export default Posts


import Post from "./Post";
// import Snackbar from "./Snackbar";
import { db } from '../firebase'
import { useEffect, useState } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";

function Posts({ posts, session }) {
  const [realtimePosts, setRealtimePosts] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "" });
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setRealtimePosts(snapshot);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <>
      {posts || realtimePosts ? (
        realtimePosts ? (
          realtimePosts.docs.map((doc) => {
            const post = doc.data();
            return (
              <Post
                key={doc.id}
                id={doc.id}
                profile={post.profile}
                name={post.name}
                timestamp={post?.timestamp}
                message={post?.message}
                postImage={post?.postImage}
                image={post?.image}
                session={session}
                showAlert={setAlert}
              />
            );
          })
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              profile={post?.profile}
              name={post.name}
              timestamp={post?.timestamp}
              message={post?.message}
              postImage={post?.postImage}
              image={post?.image}
              session={session}
              showAlert={setAlert}
            />
          ))
        )
      ) : (
        <p className="font-medium my-4">No data available to show</p>
      )}
      {/* <Snackbar
        open={alert.open}
        handleClose={setAlert}
        variant="danger"
        text={alert.message}
        title="Alert"
      /> */}
    </>
  );
}

export default Posts;