  "use-client";
  import React from "react";
  import Infinite from "./Infinite";
  import Text from "./Text";
  import Images from "./Images";
  const About = () => {
    return (
      <main
        className="
      min-h-screen w-full grid
      grid-rows-[25vh_30vh_auto]
      sm:grid-rows-[22vh_33vh_45vh]
      md:grid-rows-[20vh_35vh_45vh]
      lg:grid-rows-[20vh_35vh_45vh]
      xl:grid-rows-[18vh_32vh_50vh]
      // supports-[height:100vh]:grid-rows-[25vh_30vh_auto]
      // supports-[height:100vh]:sm:grid-rows-[22vh_33vh_45vh]
      // supports-[height:100vh]:md:grid-rows-[20vh_35vh_45vh]
      // supports-[height:100vh]:xl:grid-rows-[18vh_32vh_50vh]
      // overflow-hidden "
      >
        {/* 20% */}
        <div className="overflow-hidden flex justify-center items-center">
          <Infinite />
        </div>

        {/* 35% */}
        <div className="overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
          <Text/>
        </div>

        {/* 45% */}
        <div className="bg-green-400 overflow-hidden ">
        <Images/>
        </div>
      </main>
    );
  };

  export default About;
