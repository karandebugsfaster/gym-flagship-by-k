import React from "react";
import Image from "next/image";
const Images = () => {
  return (
    <>
      <div className="h-full flex items-center justify-around flex-col md:flex-row gap-5 sm:gap-6 md:gap-10 lg:gap-2 py-5 sm:py-8  sm:px-7 md:px-7">
        <div className="h-100 md:h-70 w-80 md:w-100 rounded-3xl text-center relative border-4 border-orange-500 overflow-hidden">
          <Image
            src="/images/gym-image-1.jpg"
            alt="image-1"
            fill
            quality={90}
            className="
                  object-cover
                  "
          />
        </div>
        <div className="h-100 md:h-70 w-80 md:w-100 rounded-3xl text-center relative border-4 border-orange-500 overflow-hidden">
          <Image
            src="/images/gym-image-2.jpg"
            alt="image-2"
            fill
            quality={90}
            className="
                  object-cover"
          />
        </div>
        <div className="h-100 md:h-70 w-80 md:w-100 rounded-3xl text-center relative border-4 border-orange-500 overflow-hidden">
          <Image
            src="/images/gym-image-3.png"
            alt="image-3"
            fill
            quality={90}
            className="
                  object-cover
                  "
          />
        </div>
      </div>
      
    </>
  );
};

export default Images;
