import React from "react";

const Pricing = () => {
  return (
    <>
      <div className="min-h-screen flex justify-around flex-col md:flex-row items-center gap-10 sm:gap-15 md:gap-20 px-7 py-5 sm:py-8">
        <div className="h-[60vh] w-full bg-blue-500 rounded-3xl text-center">
          Price Section 1
        </div>
        <div className="h-[60vh] w-full bg-blue-500 rounded-3xl text-center">
          Price Section 2
        </div>
        <div className="h-[60vh] w-full bg-blue-500 rounded-3xl text-center">
          Price Section 3
        </div>
      </div>
    </>
  );
};

export default Pricing;
