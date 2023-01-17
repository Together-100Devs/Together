import "../../index.css";

const BottomCard = ({ heading, title, description, img }) => (
  <div className="p-6 mt-6">
    <section className="tablet:flex tablet:justify-between h-fit border-solid border-2 border-black rounded-lg shadow-lg bg-secondary py-16 tablet:pt-10 px-6 tab">
      <div className=" tablet:w-2/3 tablet:px-20">
        <h3 className=" text-center text-2xl font-bold pb-10">{heading}</h3>
        <p className="font-semibold text-sm tablet:text-base laptop:text-lg">
          <span className="font-bold">{title}</span>
          {description}
        </p>
      </div>
      <div className=" tablet:w-1/3 self-center tablet:pr-10 "> 
        <img src={img} alt="two people sitting" />
      </div>
    </section>
  </div>
);
export default BottomCard;
