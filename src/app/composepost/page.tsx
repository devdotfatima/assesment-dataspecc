"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import eyeSvg from "../../assets/eye-scan-svgrepo-com.svg";
import Image from "next/image";
import TweetCard from "@/components/TweetCard";

type Props = {};

const ComposePost = ({}: Props) => {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const maxCharacters = 280;

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setCaption(value);
      setError("");
    } else {
      setError("You have exceeded the 280 character limit.");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    const availableCharacters = maxCharacters - caption.length;

    const newText = pastedText.slice(0, availableCharacters);

    setCaption((prevCaption) => prevCaption + newText);
  };
  const handlePost = async () => {
    if (isPosting) {
      return;
    }
    if (!caption.trim()) {
      setError("Caption cannot be empty.");
      return;
    }

    setIsPosting(true);
    setError("");
    setSuccessMessage("");
    try {
      const response = await axios.post("/api/tweet", { caption });

      if (response.data.id) {
        setSuccessMessage("Post published successfully!");
        setCaption("");
        setError("");
      } else {
        setError("Failed to post to Twitter.");
      }
    } catch (error) {
      setError("Failed to post tweet.");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/tweet");
      console.log(res);
      if (res.data.username) {
      } else {
        router.push("/");
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div className=" flex flex-col  gap-3  h-full sm:pt-12 w-full px-8   ">
        <div className="  lg:h-1/3   py-4 ">
          <div className="flex flex-col items-end  gap-4">
            <h2 className="w-full text-left">Caption</h2>
            <textarea
              placeholder="Type your post here"
              value={caption}
              onChange={handleCaptionChange}
              onPaste={handlePaste}
              className="w-full border-grey border-[1px] outline-none ring-0 focus:outline-grey-100 focus:border-0 bg-grey-100/10 resize-none h-32 rounded px-4 py-2"
            />
            <div className="flex justify-between items-center mt-2 w-full">
              <span
                className={`text-sm text-left ${
                  caption.length > maxCharacters
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {caption.length}/{maxCharacters} characters
              </span>
            </div>

            <button
              onClick={handlePost}
              className="flex items-center justify-center w-32 gap-2 bg-gradient-to-r from-purple to-pink hover:bg-gradient-to-tr transition-all hover:scale-95 duration-100 ease-in text-white rounded-md px-4 py-2"
            >
              Post
            </button>
          </div>
          {error && <span className="text-red-500 text-left">{error}</span>}
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
        </div>
        <div className=" bg-grey py-20 min-h-80 lg:h-2/3 flex flex-col items-center justify-center rounded-lg">
          {caption ? (
            <TweetCard text={caption} />
          ) : (
            <>
              <Image
                src={eyeSvg}
                alt="View Your Post"
                width={100}
                height={100}
                className="mx-auto my-8"
              />
              <div className="w-3/4 border border-dashed border-grey-200 rounded-lg p-4 text-center">
                <h3 className="text-lg font-bold mb-4">Post Preview</h3>
                <p className="text-white">
                  {caption || "Your post preview here"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <Footer secondaryBtnFunctionality={handlePost} /> */}
    </>
  );
};

export default ComposePost;
