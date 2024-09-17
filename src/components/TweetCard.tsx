"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TweetCardPropsT } from "@/utils/types";
import twitterSVG from "../assets/TwitterWhite.svg";
import axios from "axios";

const TweetCard = ({ text }: TweetCardPropsT) => {
  const [user, setUser] = useState<any>(null);
  const [tweetTimestamp, setTweetTimestamp] = useState<{
    month: string;
    date: number;
    year: number;
    time: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/tweet");

      if (res.data) {
        console.log(res.data);

        setUser(res.data);
      }
    };

    fetchUser();

    const now = new Date();

    const dateParts = {
      month: now.toLocaleString("en-US", { month: "short" }),
      date: now.getDate(),
      year: now.getFullYear(),
      time: now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }), // e.g., "6:23 AM"
    };

    console.log(dateParts);

    setTweetTimestamp(dateParts);
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

        <Image src={twitterSVG} alt="twitter icon" width={20} height={20} />
      </div>

      {/* Tweet Text */}
      <p className="text-sm">{text}</p>

      {/* Timestamp */}
      <p className="text-gray-400 text-xs text-left">
        {tweetTimestamp?.time} · {tweetTimestamp?.month} {tweetTimestamp?.date},{" "}
        {tweetTimestamp?.year}
      </p>
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
