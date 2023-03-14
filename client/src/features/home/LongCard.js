import "../../index.css";
import DiscordButton from "./DiscordButton";
import { useAuthContext } from "contexts/AuthContext";

const LongCard = ({ heading, title, description, img }) => {
  // Access authentication context
  const auth = useAuthContext();
  return (
    <section className="border-solid border-2 border-black rounded-2xl bg-secondary flex justify-center py-6 xl:py-14 w-full xl:gap-10">
      <div className="hidden lg:flex items-center justify-center">
        <img
          src={img}
          alt="two people sitting"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center gap-8 text-center w-full lg:max-w-xl">
        {/* Display "heading, username" if logged in, or just the heading if logged out */}
        <h1 className="text-2xl font-bold lg:text-3xl xl:text-4xl">
          {auth.user ? `${heading}, ${auth.user?.displayName}!` : `${heading}!`}
        </h1>
        <p className="px-10 font-medium">
          <span className="font-bold">{title}</span>
          {description}
        </p>
        <DiscordButton />
      </div>
    </section>
  );
};
export default LongCard;
