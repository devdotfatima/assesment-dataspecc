"use client";
import React, { useState } from "react";
import axios from "axios";
import eyeSvg from "../../assets/eye-scan-svgrepo-com.svg";
import Image from "next/image";
import Footer from "@/components/Footer";
import TweetCard from "@/components/TweetCard";

type Props = {};

const ComposePost = ({}: Props) => {
  const [caption, setCaption] = useState(""); // Caption text state
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

  return (
    <>
      <div className=" flex flex-col gap-4 lg:grid grid-cols-12 h-screen py-10 w-full ">
        <div className="col-span-full lg:col-span-8 h-fit lg:h-full px-8 py-4 border-t-2 border-grey">
          <div className="flex flex-col  gap-4">
            <h2>Caption</h2>
            <textarea
              placeholder="Type your post here"
              value={caption}
              onChange={handleCaptionChange}
              onPaste={handlePaste}
              className="w-full border-grey border-[1px] outline-none ring-0 focus:outline-grey-100 focus:border-0 bg-grey-100/10 resize-none h-32 rounded px-4 py-2"
            />
            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm ${
                  caption.length > maxCharacters
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {caption.length}/{maxCharacters} characters
              </span>
              {error && <span className="text-red-500">{error}</span>}
            </div>
          </div>
          {successMessage && (
            <div className="text-green-500 mt-4">{successMessage}</div>
          )}
        </div>
        <div className="col-span-full lg:col-span-4 bg-grey h-[55%] lg:h-[88.2%] flex flex-col items-center justify-center">
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
      <Footer secondaryBtnFunctionality={handlePost} />
    </>
  );
};

export default ComposePost;
