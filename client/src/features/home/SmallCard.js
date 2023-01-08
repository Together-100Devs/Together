import "../../index.css";

const SmallCard = ({ heading, description, Icon }) => {
  let cardColor =
    heading === "Order1"
      ? "bg-[#3EA6D7]"
      : heading === "Order2"
      ? "bg-[#5ABABE]"
      : "bg-[#E0835D]";
  return (
    <div
      className={`text-white p-8 my-8 tablet:w-full border-2 border-black rounded-xl shadow-lg ${cardColor}`}
    >
      <h1 className="font-bold text-2xl text-center pb-10">{heading}</h1>
      <p className="text-xl">{description}</p>
      <div className="w-full h-[8rem] grid place-content-end px-2">
        <Icon className=" text-6xl" />
      </div>
    </div>
  );
};

export default SmallCard;
