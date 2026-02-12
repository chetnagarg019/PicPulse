import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-tr from-purple-200 via-pink-100 to-blue-200 py-16 px-4">

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-center mb-14 text-gray-800 tracking-tight">
        ✨ Explore Feed
      </h1>

      {/* Feed Container */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {posts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-xl">
            No posts available
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="relative group rounded-3xl overflow-hidden backdrop-blur-lg bg-white/30 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-300/40"
            >

              {/* Image */}
              <img
                src={post.image}
                alt="post"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

              {/* Caption + Icons */}
              <div className="absolute bottom-0 p-6 text-white w-full">
                <h2 className="text-xl font-semibold mb-3">
                  {post.caption}
                </h2>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Heart className="cursor-pointer hover:text-red-400 transition" />
                    <MessageCircle className="cursor-pointer hover:text-blue-400 transition" />
                    <Share2 className="cursor-pointer hover:text-green-400 transition" />
                  </div>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Feed;
