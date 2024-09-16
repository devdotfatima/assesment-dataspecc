"use client";
import React, { useState, useEffect } from "react";
import { BiPencil, BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FiInfo } from "react-icons/fi";
import Image from "next/image";
import axios from "axios";
import eyeSvg from "../../assets/eye-scan-svgrepo-com.svg";
import twitterSVG from "../../assets/twitter_icon_white.svg";
import TweetCard from "@/components/TweetCard";
import Accordion from "@/components/ui/Accordion";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

const ComposePost = ({}: Props) => {
  const [idea, setIdea] = useState("Untitled");
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const maxCharacters = 280;

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setCaption(value);
    } else {
      toast.error("You have exceeded the 280 character limit.");
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
      toast.error("Caption cannot be empty.");
      return;
    }

    setIsPosting(true);

    try {
      const response = await axios.post("/api/tweet", { caption });

      if (response.data.id) {
        toast.success("Post published successfully!");
        setCaption("");
      } else {
        toast.error("Failed to post to Twitter.");
      }
    } catch (error) {
      toast.error("Failed to post tweet.");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/tweet");
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/");
        } else {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [router]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex bg-[#181818] h-32 lg:h-[14vh]">
        <div className="p-5 flex flex-col items-center justify-center gap-2 border-r border-grey">
          <button className=" py-6  bg-gradient-to-r from-purple to-pink w-16 flex justify-center  rounded-full">
            <BiPlus />
          </button>
          <span className="text-xs font-thin"> Compose Post</span>
        </div>
      </div>
      <div className=" grid lg:grid-cols-12    h-[79vh]  w-full px-0   ">
        <div className="  col-span-full lg:col-span-8   py-4 border-t-2 border-grey  ">
          <div className="mb-4 px-8">
            <label className="block text-sm font-light tracking-widest uppercase text-gray-300">
              Idea
            </label>

            <div className="flex items-center ">
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="bg-transparent font-semibold text-white text-lg py-0.5 focus:outline-none"
                style={{ width: `${idea.length - 1}ch` }}
              />
              <BiPencil className="text-grey" />
            </div>
          </div>

          {/* Channel Selection */}
          <div className="mb-4 px-8">
            <label className="block text-sm font-light tracking-widest uppercase text-gray-300">
              Channel
            </label>
            <div className="flex space-x-4 mt-2">
              <Image
                src={twitterSVG}
                alt="twitter icon"
                width={20}
                height={20}
                className=" bg-white p-2 h-10 w-10 rounded-full"
              />
            </div>
          </div>

          <div className="my-10 flex flex-col items-end w-full border-t-2 space-y-6 border-grey p-6 ">
            <Accordion
              heading="Caption"
              content={
                <div className="bg-black flex flex-col gap-3">
                  {" "}
                  <label className=" text-base tracking-wide font-light text-gray-300 flex items-center gap-4">
                    Type the caption yourself.{" "}
                    <FiInfo size={16} className="text-grey-100" />
                  </label>
                  <textarea
                    value={caption}
                    onChange={handleCaptionChange}
                    onPaste={handlePaste}
                    placeholder="Enter your Caption here"
                    className="bg-grey/40 text-white font-light tracking-wide resize-none placeholder-gray-500 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-700 h-24"
                  />
                  <span className="text-left  text-base tracking-wide font-light text-gray-300">
                    {caption.length}/{maxCharacters} characters
                  </span>
                </div>
              }
            />

            <button
              onClick={handlePost}
              className="flex items-center justify-center w-32 gap-2 bg-gradient-to-r from-purple to-pink hover:bg-gradient-to-tr transition-all hover:scale-95 duration-100 ease-in text-white rounded-md px-4 py-2"
            >
              Post
            </button>
            {/* <Accordion
              heading="Creative"
              content={
                <div className="">
                  {" "}
                  <label className=" text-base tracking-wide font-light text-gray-300 flex items-center gap-4">
                    Upload custom image or let AI create one for you. The
                    selection of creatives has a limit of 10 at max.
                  </label>
                  <p className="text-sm text-gray-400 mb-2"></p>
                  <label className="cursor-pointer flex justify-center items-center bg-grey/40 text-gray-400 border  border-gray-500 rounded-lg py-4 hover:bg-grey/65">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-h-40"
                      />
                    ) : (
                      <div className=" flex flex-col justify-center items-center gap-2  ">
                        <Image
                          src={gallerySvg}
                          alt="Add Photos"
                          width={80}
                          height={80}
                          className="mx-auto "
                        />
                        <span className="text-lg tracking-wider font-light font-inter">
                          Select Image
                        </span>
                        <p className="text-base tracking-wide font-light">
                          Upload now or choose from previously uploaded images
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              }
            /> */}
          </div>
        </div>
        <div className=" bg-grey py-20 col-span-full lg:col-span-4 h-full  flex flex-col items-center justify-center ">
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
