import "../../index.css";
import DiscordButton from "./DiscordButton";

const LongCard = ({ heading, title, description, img }) => (
  <div className="p-4 box-border border-solid border-2 border-emerald-500">
    <section className="flex py-6 tablet:h-[44rem] border-solid border-2 border-black rounded-3xl bg-secondary tablet:py-20 ">
      <div className="w-full place-self-center hidden tablet:block">
        <img src={img} alt="two people sitting" />
      </div>
      <div>
        <h1 className="text-center font-bold h-28 tablet:h-32 pt-8 tablet:pt-14 text-2xl tablet:text-xl">
          {heading}
        </h1>
        <p className=" font-medium text-md tablet:text-xl pl-10 pr-10 ">
          <span className="font-bold">{title}</span>
          {description}
        </p>
        <DiscordButton />
      </div>
    </section>
  </div>
);
export default LongCard;
