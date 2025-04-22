//
import React from "react";
import "index.css";
import HamburgerNav404 from "features/notFound404/HamburgerNav404";

import BottomCard from "features/home/BottomCard";
import NotFoundCard from "features/notFound404/NotFoundCard";
import NavContainer404 from "features/notFound404/NavContainer404";

export default function NotFoundPage() {
  return (
    <>
      <div className="flex flex-col items-center w-full pt-20 min-h-screen pb-10 md:pt-5 lg:text-lg  bg-primary">
        <HamburgerNav404 logo={"./logoicon.png"} logotext={"./logotext.png"} />
        <div className="flex flex-col items-center gap-10 w-full p-4 max-w-xl md:max-w-3xl lg:max-w-5xl lg:gap-20 xl:max-w-7xl">
          <NavContainer404 />

          <NotFoundCard
            heading={"Oops, looks like you are lost ..."}
            img={"404-pic.png"}
          />
        </div>
      </div>
    </>
  );
}
