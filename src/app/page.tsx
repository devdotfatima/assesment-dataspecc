import Image from "next/image";
import homeImage from "../assets/amico.png";
import shareSVG from "../assets/share-circle-svgrepo-com 2.svg";
import twitterSVG from "../assets/Twitter.svg";
import TwitterService from "@/utils/twitterService";

export default function Home() {
  const twitterServiceInstance = TwitterService.getInstance();
  return (
    <>
      <div className="flex flex-col flex-grow h-full  items-center justify-start py-10 px-8 md:px-8 max-w-4xl mx-auto w-full ">
        <Image
          src={homeImage}
          alt="Connect Your Social Media Channel"
          width={250}
          height={250}
          className="mx-auto hidden sm:block sm:mb-8 h-72 w-72 "
        />
        <section className="  flex flex-col sm:gap-4 ">
          <div className="flex items-center gap-4">
            <Image
              src={shareSVG}
              alt="Connect Your Social Media Channel"
              width={26}
              height={26}
              className="hidden sm:block"
            />
            <h2 className="text-lg sm:text-2xl font-bold  font-merriweather">
              Connect Your Social Media Channel
            </h2>
          </div>

          <p className="text-gray-400 sm:ml-10 font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <div className="flex flex-col items-center sm:items-start justify-center mt-8 sm:mt-6 ">
            <div className="flex flex-col gap-4 border-[1px] border-grey items-center justify-center h-44 w-full sm:w-48  bg-gradient-to-r from-emerald-900/25 via-emerald-800/30 to-emerald-900/25  rounded-md text-sm  font-inter font-thin">
              <Image
                src={twitterSVG}
                alt="Twitter Icon"
                width={42}
                height={42}
                className=" rounded-full bg-black p-1.5"
              />
              <p>Twitter</p>
              <form action={twitterServiceInstance.login} className="w-full">
                <button
                  // onClick={twitter.login}
                  type="submit"
                  className="w-10/12 border-[1px] mx-auto flex justify-center  text-center border-grey bg-pos-0 hover:bg-pos-100 bg-size-200 hover:scale-95  py-2 rounded-lg bg-gradient-to-r from-emerald-900/25 via-emerald-800/30 to-emerald-900/25 transition-all duration-150 ease-in"
                >
                  Connect
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
