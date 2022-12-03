import React from "react";
import "../../index.css";

const LongCard = ({ children }) => {
  return (
    <div>
      <section className="container">
        <div className="center">
          <span>{children}</span>
          <p>{children}</p>
        </div>
      </section>
    </div>
  );
};

export default LongCard;
