import "../../index.css";
import DiscordButton from "./DiscordButton";
import { useAuthContext } from "contexts/AuthContext";

const LongCard = ({ heading, title, description, img }) => {
  // Access authentication context
  const auth = useAuthContext();
  return (
    <div className="w-full p-4 ">
      <section className="flex py-6 laptop:px-20 tablet:h-[44rem] border-solid border-2 border-black rounded-3xl bg-secondary tablet:py-20 l-fit">
        <div className="hidden tablet:w-full place-self-center tablet:block">
          <img src={img} alt="two people sitting" />
        </div>
        <div className="tablet:w-full">
          {/* Display "heading, username" if logged in, or just the heading if logged out */}
          <h1 className="py-8 text-2xl font-bold text-center h-28 tablet:h-32 tablet:pt-14 tablet:text-xl">
            {auth.user
              ? `${heading}, ${auth.user?.displayName}!`
              : `${heading}!`}
          </h1>
          <p className="pl-10 pr-10 font-medium text-md tablet:text-xl">
            <span className="font-bold">{title}</span>
            {description}
          </p>
          <DiscordButton />
        </div>
      </section>
    </div>
  );
};
export default LongCard;
