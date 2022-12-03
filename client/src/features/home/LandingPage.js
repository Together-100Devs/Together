import React from "react";
import "../../index.css";
import LongCard from "./LongCard";
import SmallCard from "./SmallCard";

const LandingPage = () => {
  return (
    <div>
      <section className="container">
        <div className="center">
          <SmallCard img={"https://via.placeholder.com/150.png"} />
          <SmallCard img={"https://via.placeholder.com/150.png"} />
          <LongCard></LongCard>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
