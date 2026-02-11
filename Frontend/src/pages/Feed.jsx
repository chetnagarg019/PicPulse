import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
        _id : "1",
        image : "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
        caption : "Beautiful" 
    }
  ]);

//   // Backend se posts fetch karna
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/posts");
//         const data = await res.json();
//         setPosts(data.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);
   useEffect(() =>{
     axios.get("http://localhost:5000/posts")
     .then((res)=>{
        // console.log(res.data);
        setPosts(res.data.data)
     })
   },[])

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Feed
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={post.image}
                alt="post"
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {post.caption}
                </h2>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Feed;
