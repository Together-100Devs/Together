import "../../index.css";
import { FaGithub } from "react-icons/fa";

const BottomCard = ({ heading, title, description, img }) => (
  <section className="border-solid border-2 border-black rounded-2xl bg-secondary flex justify-center py-6 flex-col lg:flex-row xl:gap-10 w-full">
    <div className="flex flex-col items-center gap-8 text-center w-full lg:max-w-xl">
      <h2 className="text-2xl font-bold lg:text-3xl xl:text-4xl">{heading}</h2>
      <p className="px-10 font-medium">
        <span className="font-bold">{title}</span>
        {description}
      </p>
      <div className="flex flex-col items-center gap-1">
        <span className="font-semibold text-center">
          Interested in collaborating with us?
        </span>
        <div className="flex border-2 border-slate-400 bg-white rounded-2xl">
          <div className="py-3 px-8 m-3 bg-accent rounded-lg font-bold">
            <a
              href="https://github.com/Caleb-Cohen/Together"
              className="flex items-center justify-center tracking-widest gap-3"
              type="submit"
            >
              <FaGithub className="w-7 h-7" />
              Together GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <img
        src={img}
        alt="three people sitting"
        className="object-cover w-96 lg:w-full h-full"
      />
    </div>
  </section>
);
export default BottomCard;
