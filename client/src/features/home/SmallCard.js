import React from "react";
import "../../index.css";

const SmallCard = ({ img }) => {
  return (
    <div>
      <div className="flex flex-row ">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default SmallCard;
