import React from "react";

const About = () => {
  return (
    <main
      className="
    h-screen w-full grid
    grid-rows-[25vh_30vh_45vh]
    sm:grid-rows-[22vh_33vh_45vh]
    md:grid-rows-[20vh_35vh_45vh]
    lg:grid-rows-[20vh_35vh_45vh]
    xl:grid-rows-[18vh_32vh_50vh]

    supports-[height:100dvh]:grid-rows-[25dvh_30dvh_45dvh]
    supports-[height:100dvh]:sm:grid-rows-[22dvh_33dvh_45dvh]
    supports-[height:100dvh]:md:grid-rows-[20dvh_35dvh_45dvh]
    supports-[height:100dvh]:xl:grid-rows-[18dvh_32dvh_50dvh]

    overflow-hidden
  "
    >
      {/* 20% */}
      <section className="bg-red-400 overflow-hidden">
        I am the infinite scroll thing!
      </section>

      {/* 35% */}
      <section className="bg-yellow-400 overflow-hidden flex items-center justify-center px-6">
        I am the text
      </section>

      {/* 45% */}
      <section className="bg-green-400 overflow-hidden">
        I am some Images
      </section>
    </main>
  );
};

export default About;
