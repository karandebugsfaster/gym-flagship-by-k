import React from "react";

const Text = () => {
return (
    <>
    <div className="flex items-center justify-center flex-col sm:gap-4 md:gap-5">
        <div
        className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl
        font-bold
        bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
        bg-clip-text 
        text-transparent"
        >
        NOT JUST A GYM
        </div>
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
        A PLACE TO{" "}
        <b
            className="bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent"
        >
            EVOLVE.
        </b>
        </div>
        <div
        className="
            text-base sm:text-lg md:text-xl
            max-w-[90%] sm:max-w-[80%] md:max-w-[700px]
            text-white/80 flex flex-col items-center"
        >
        <div>Built for real people. Real goals.</div>
        <div>Real progress. No matter where</div>
        <div>you start— you belong here.</div>
        </div>
    </div>
    </>
);
};

export default Text;
