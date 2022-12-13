import "../../index.css";
import LongCard from "./LongCard";
import SmallCard from "./SmallCard";

const LandingPage = () => (
  <div className="flex flex-wrap">
    <div className="flex flex-row text-center space-x-6">
      <SmallCard
        title={"together"}
        img1={"../../togetherFavicon.ico"}
        img2={"../../threeHumans.png"}
      />

      <SmallCard img3={"../../hooman.png"} title={"Welcome!"} />
    </div>

    <div className=" w-70">
      <LongCard />
    </div>
  </div>
);

export default LandingPage;