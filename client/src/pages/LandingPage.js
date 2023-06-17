import React from "react";
import "index.css";
import LongCard from "../features/home/LongCard";
import BottomCard from "../features/home/BottomCard";
import NavContainer from "../features/home/NavContainer";
import SmallCard from "../features/home/SmallCard";
import HamburgerNav from "../features/home/HamburgerNav";

const LandingPage = () => {
  const cards = [
    {
      heading: "Join 100devs",
      description: (
        <>
          <a
            className="underline font-bold"
            href="https://leonnoel.com/100devs/"
          >
            100Devs
          </a>{" "}
          is a diverse and inclusive community of participants in a software
          engineering training program run by Leon Noel. It is 100% free and
          requires absolutely no previous technical experience.
        </>
      ),
    },
    {
      heading: "Contributing to Together",
      description:
        "We are currently working on video resources for individuals that would like to learn more about how to contribute to Together and how Together works. Follow along on our Youtube when it is ready!",
    },
    {
      heading: "Community Taught",
      description: (
        <>
          Keep track of your 100devs course progress using{" "}
          <a
            className="underline font-bold"
            href={`https://communitytaught.org/`}
          >
            Community Taught
          </a>{" "}
          created by 100devs alumna, Laura Abro.
          <br></br>
          <br></br>
          <a
            className="underline font-bold"
            href={`https://communitytaught.org/resources/`}
          >
            Additional Resources
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full pt-20 min-h-screen pb-10 md:pt-5 lg:text-lg bg-primary">
      <HamburgerNav logo={"./logoicon.png"} logotext={"./logotext.png"} />
      <div className="flex flex-col items-center gap-10 w-full p-4 max-w-xl md:max-w-3xl lg:max-w-5xl lg:gap-20 xl:max-w-7xl">
        <NavContainer />
        <LongCard
          img={"/Homeoffice.png"}
          heading="Welcome"
          title="Together"
          description=" is a new app designed for
              100Devs. Together is a group calendar for public events, so you can
              see what's going on in your community. We're making it
              easier to find out about the events that are happening in Discord and
              let you know how much fun they'll be!"
        />
        <div className="flex flex-col items-center gap-5 xl:gap-10 lg:flex-row lg:items-start lg:justify-center">
          {cards.map((cardData, index) => {
            return (
              <SmallCard
                heading={cardData.heading}
                description={cardData.description}
                key={index}
                index={index}
              />
            );
          })}
        </div>
        <BottomCard
          heading="Who we are"
          description={
            <>
              <p>
                Together is a community-driven open source project backed by
                members of 100devs. Together is not only designed to be a
                valuable tool to the 100devs community but also provides an
                additional opportunity for students to learn in a group
                environment. Together is open to all varying skill sets and
                encourages peer programming.
              </p>
            </>
          }
          img={"/threeHumans.png"}
        />
      </div>
    </div>
  );
};

export default LandingPage;
