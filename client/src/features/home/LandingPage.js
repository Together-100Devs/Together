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
      heading: "Order1",
      description: "Descption1",
    },
    {
      heading: "Order2",
      description: "Descption2",
    },
    {
      heading: "Order3",
      description: "Descption3",
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
      <div className="w-full p-6 text-center tablet:inline-flex tablet:space-x-10 tablet:p-6 border-solid border-2 border-emerald-500 tablet:w-full tablet:h-[27rem]">
        {cards.map(cardData => {
          return (
            <SmallCard
              heading={cardData.heading}
              description={cardData.description}
              Icon={CgChevronDoubleRightO}
            />
          );
        })}
      </div>
      <BottomCard
        heading="Lorem"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        img={"/threeHumans.png"}
      />
    </div>
  );
};

export default LandingPage;
