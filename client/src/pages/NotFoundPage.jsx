//
import React from "react";
import "index.css";
import HamburgerNav from "features/home/HamburgerNav";

import BottomCard from "features/home/BottomCard";
import NavContainer404 from "features/notFound404/NavContainer404";

export default function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col items-center w-full pt-20 min-h-screen pb-10 md:pt-5 lg:text-lg bg-primary">
        <HamburgerNav logo={"./logoicon.png"} logotext={"./logotext.png"} />
        <div className="flex flex-col items-center gap-10 w-full p-4 max-w-xl md:max-w-3xl lg:max-w-5xl lg:gap-20 xl:max-w-7xl">
          <NavContainer404 />

          <BottomCard
            heading="Oops!!! Looks like you are lost"
            description={
              <>
                <p></p>
              </>
            }
            img={"/404-pic.png"}
          />
        </div>
      </div>
    </>
  );
}
