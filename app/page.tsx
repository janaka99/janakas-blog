import Marquee from "@/components/UI/Marquee";
import {
  CATEGORIES,
  HERO_DESCRIPTION,
  HERO_TITLE_ONE,
  HERO_TITLE_TWO,
} from "@/constants";
import LatestPost from "./_components/LatestPost";
import HomepagePosts from "./_components/HomepagePosts";
import Container from "@/components/Layouts/Container/Container";
import Button from "@/components/UI/Button/Button";

export default function Home() {
  return (
    <div className="w-full h-full bg-background-800 ">
      <Container>
        <section className="h-[90svh] w-full justify-center flex flex-col gap-20 md:flex-row">
          <div className="flex-grow flex flex-col justify-between items-center py-[10vh] md:py-[4vh]">
            <div className=""></div>
            <h1 className="text-secondary-100 text-center text-size-hero">
              JANAKA'S <br /> BLOG
            </h1>
            <div className="flex flex-col justify-center items-center gap-[2vw] lg:gap-6 md:flex-row sm ">
              <Button link={""} classes="lg:text-xl" autofocus={true}>
                All
              </Button>
              {CATEGORIES.map((cat, i) => {
                return (
                  <Button link={cat.link} key={i} classes="lg:text-xl">
                    {cat.text}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>
        <section className="">
          <LatestPost />
          <HomepagePosts />
        </section>
      </Container>
    </div>
  );
}
