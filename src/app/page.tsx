import Image from "next/image";
import homeImage from "../assets/amico.png";
import shareSVG from "../assets/share-circle-svgrepo-com 2.svg";
import twitterSVG from "../assets/twitter_icon.svg";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-grow h-full  items-center justify-center py-10 px-4 md:px-8 max-w-4xl mx-auto w-full ">
        <Image
          src={homeImage}
          alt="Connect Your Social Media Channel"
          width={250}
          height={250}
          className="mx-auto my-16"
        />
        <section className="  flex flex-col gap-4 ">
          <p className="tracking-widest">
            1<span className="text-grey-100">/5</span>
          </p>
          <div className="flex items-center gap-4">
            <Image
              src={shareSVG}
              alt="Connect Your Social Media Channel"
              width={26}
              height={26}
              className=""
            />
            <h2 className="text-2xl font-bold  font-merriweather">
              Connect Your Social Media Channel
            </h2>
          </div>

          <p className="text-gray-400 ml-10 font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <div className="flex flex-col items-start mt-10 ">
            <div className="flex flex-col gap-4 border-[1px] border-grey items-center justify-center h-44 w-48  bg-gradient-to-r from-emerald-900/25 via-emerald-800/30 to-emerald-900/25  rounded-md text-sm  font-inter font-thin">
              <Image
                src={twitterSVG}
                alt="Twitter Icon"
                width={42}
                height={42}
                className=" rounded-full bg-black p-1.5"
              />
              <p>Twitter</p>
              <button className="w-10/12 border-[1px] border-grey bg-pos-0 hover:bg-pos-100 bg-size-200 hover:scale-95  py-2 rounded-lg bg-gradient-to-r from-emerald-900/25 via-emerald-800/30 to-emerald-900/25 transition-all duration-150 ease-in">
                Connect
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
