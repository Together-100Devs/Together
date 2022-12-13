import "../../index.css";
import DiscordButton from "./DiscordButton";

const SmallCard = ({ img1, img2, img3, title }) => {
  let titleColor = title === "together" ? "text-logoText" : "text-black";
  let showBtn = title === "Welcome!";
  return (
    <div className="w-90 h-64 block px-16 pt-8 mb-0 border-solid border-2 border-slate-600 rounded-lg shadow-lg bg-secondary">
      <div>
        <img className="mx-auto w-10 h-18" src={img1} alt="" />
        <span className={`${titleColor} font-bold text-2xl mt-8`}>{title}</span>
        {showBtn && <DiscordButton />}
        <img className="-mb-2" src={img2} alt="" />
        <img src={img3} alt="" />
      </div>
    </div>
  );
};
export default SmallCard;