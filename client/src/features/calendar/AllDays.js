import React from "react";

const AllDays = () => {
  return (
    <div className="grid grid-cols-7 mt-4">
      <div className="pl-1 text-md font-bold">Mon</div>
      <div className="pl-1 text-md font-bold">Tue</div>
      <div className="pl-1 text-md font-bold">Wed</div>
      <div className="pl-1 text-md font-bold">Thu</div>
      <div className="pl-1 text-md font-bold">Fri</div>
      <div className="pl-1 text-md font-bold text-[#E0835D]">Sat</div>
      <div className="pl-1 text-md font-bold text-[#E0835D]">Sun</div>
    </div>
  );
};

export default AllDays;
