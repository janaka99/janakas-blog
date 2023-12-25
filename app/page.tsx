import Marquee from "@/components/UI/Marquee";
import { HERO_DESCRIPTION, HERO_TITLE_ONE, HERO_TITLE_TWO } from "@/constants";
import LatestPost from "./_components/LatestPost";
import HomepagePosts from "./_components/HomepagePosts";

export default function Home() {
  return (
    <main className="overflow-hidden flex flex-col justify-between min-h-screen bg-white">
      <div>
        <div className="_container py-5">
          <div className="w-[100%] flex flex-col">
            <div className="flex flex-col w-full h-[calc(100vh-80px)] justify-between items-center gap-6 ">
              <div className=""></div>
              <div className="w-full flex items-center justify-between gap-10">
                <div className="flex flex-col items-center  lg:items-start gap-6 w-full lg:w-[60%]">
                  <div className="font-bold text-6xl xl:text-7xl 2xl:text-9xl  text-center lg:text-left">
                    {HERO_TITLE_ONE}
                  </div>
                  <div className="font-nomal text-xl  md:text-2xl text-gray-400  text-center lg:text-left">
                    {HERO_TITLE_TWO}
                  </div>
                </div>
                <div className="hidden lg:flex w-2/6 mt-[10%]">
                  <p className="font-nomal text-2xl text-gray-400">
                    {HERO_DESCRIPTION}
                  </p>
                </div>
              </div>
              <Marquee />
            </div>
          </div>
        </div>
        <section className="_container my-10 flex-col gap-20">
          <LatestPost />
          <HomepagePosts />
        </section>
      </div>
    </main>
  );
}
