import "../../index.css";

const SmallCard = ({ heading, description, Icon, index }) => {
  let cardColors = ["bg-[#3EA6D7]", "bg-[#5ABABE]", "bg-[#E0835D]"];
  let colorIndex = (index + 1) % cardColors.length;
  return (
    <div
      className={`text-white p-5 my-8 tablet:w-full tablet:min-h-full border-2 border-black rounded-xl shadow-lg ${cardColors[colorIndex]}`}
    >
      <h1 className="font-bold desktop:text-lg tablet:text-base text-center pb-7">
        {heading}
      </h1>
      <p className="desktop:text-base tablet:text-sm">{description}</p>
      <div className="w-full h-[5rem] grid place-content-end px-2">
        <Icon className=" text-6xl" />
      </div>
    </div>
  );
};

export default SmallCard;
