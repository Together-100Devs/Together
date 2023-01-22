import React from "react";
import "../../index.css";
import LongCard from "./LongCard";
import BottomCard from "./BottomCard";
import NavContainer from "./NavContainer";
import SmallCard from "./SmallCard";
import { CgChevronDoubleRightO } from "react-icons/cg";
import HamburgerNav from "./HamburgerNav";

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
      )
    },
    {
      heading: "Contributing to Together",
      description: "We are currently working on video resources for individuals that would like to learn more about how to contribute to Together and how Together works. Follow along on our Youtube when it is ready!",
    },
    {
      heading: "Community Taught",
      description: (
        <>
          Keep track of your 100devs course progress using 
          {" "}
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
      )
    },
  ];

  return (
    <div className="flex flex-wrap desktop:w-full pt-20 tablet:pt-0">
      <HamburgerNav logo={"./logoicon.png"} logotext={"./logotext.png"} />
      <NavContainer />
      <LongCard
        img={"/Homeoffice.png"}
        heading="Welcome!"
        title="Together"
        description=" is a new app designed for
          100Devs. Together is a group calendar for public events, so you can
          see what's going on in your community. We're making it
          easier to find out about the events that are happening in Discord and
          let you know how much fun they'll be!"
      />
      <div className="w-full p-6 text-center tablet:inline-flex tablet:space-x-10 tablet:p-6 tablet:w-full tablet:h-[27rem]">
        {cards.map((cardData, index) => {
          return (
            <SmallCard
              heading={cardData.heading}
              description={cardData.description}
              Icon={CgChevronDoubleRightO}
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
              Together is a community-driven open source project backed by members of 100devs.
              Together is not only designed to be a valuable tool to the 100devs community but also
              provides an additional opportunity for students to learn in a group environment.
              Together is open to all varying skill sets and encourages peer programming. 
            </p>
            <p>
              <br></br>
              Interested in collaborating with us?{" "}
              <a
                className="underline font-bold"
                href={`https://github.com/Caleb-Cohen/Together`}
              >
              <br></br>
                Together GitHub
              </a>
            </p>
          </>
        }
        img={"/threeHumans.png"}
      />
    </div>
  );
};

export default LandingPage;
