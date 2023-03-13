import "../../index.css";

const SmallCard = ({ heading, description, index }) => {
  let cardColors = ["bg-[#3EA6D7]", "bg-[#5ABABE]", "bg-[#E0835D]"];
  let colorIndex = (index + 1) % cardColors.length;
  return (
    <div
      className={`text-white p-6 xl:py-10 text-center border-2 border-black rounded-2xl shadow-lg ${cardColors[colorIndex]} w-full lg:h-80`}
    >
      <h1 className="font-bold text-center pb-7 text-lg lg:text-xl xl:text-2xl">
        {heading}
      </h1>
      <p>{description}</p>
    </div>
  );
};

export default SmallCard;
