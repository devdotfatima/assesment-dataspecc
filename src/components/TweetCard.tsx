"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TweetCardPropsT } from "@/utils/types";
import twitterSVG from "../assets/Twitter_icon_white.svg";
import axios from "axios";

const TweetCard = ({ text }: TweetCardPropsT) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/tweet");

      if (res.data) {
        console.log(res.data);

        setUser(res.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-10/12 mx-auto bg-white text-black rounded-xl shadow-md p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          {/* Profile Image */}
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="bg-white w-6 h-6"></div>
          </div>
          <div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-gray-400">@{user?.username}</p>
          </div>
        </div>

        <Image
          src={twitterSVG}
          alt="twitter icon"
          width={20}
          height={20}
          // className="mx-auto my-8"
        />
      </div>

      {/* Tweet Text */}
      <p className="text-sm">
        {text}
        {/* <span className="text-blue-400">#myfirsttweet</span>{" "}
        <span className="text-blue-400">twitter.com</span>{" "}
        <span className="text-blue-400">@twitter</span> */}
      </p>

      {/* Image Grid */}
      {/* <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2 bg-black w-full h-16"></div>
        <div className="bg-black w-full h-16"></div>
      </div> */}

      {/* Website Preview */}
      {/* <div className="flex items-center space-x-2 border border-gray-700 rounded p-2">
        <div className="bg-black w-12 h-12"></div>
        <div>
          <p className="text-sm">xample.com</p>
          <p className="text-xs text-gray-400">
            The quick brown fox jumps over...
          </p>
          <p className="text-xs text-gray-400">
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div> */}
      {/* Timestamp */}
      <p className="text-gray-400 text-xs text-left">00:00 AM · Jan 0, 0000</p>
      <hr />
      {/* Tweet Stats */}
      <div className="flex justify-start gap-3 text-gray-400 text-xs">
        <p>
          <span className="text-black">20</span> Retweets
        </p>
        <p>
          <span className="text-black">34</span> Quote tweets
        </p>
        <p>
          <span className="text-black">852</span> Likes
        </p>
      </div>
    </div>
  );
};

export default TweetCard;
