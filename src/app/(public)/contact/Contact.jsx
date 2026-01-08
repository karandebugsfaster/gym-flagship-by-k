import React from "react";
import Image from "next/image";

const Contact = () => {
  return (
    <>
      <div className="min-h-screen flex justify-around items-center lg:px-15">
        <div className="h-[90vh] w-full rounded-3xl text-center flex flex-col gap-5">
          <div
            className="text-4xl md:text-5xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent
            font-bold"
          >
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
            <i>REACH OUT TO US</i>
          </div>
          <div className="text-2xl md:text-3xl">
            Book your free training session now...
          </div>
          <div className="text-lg md:text-xl">
            Send us "HII" on Whatsapp / Instagram, Our team will reach you out
          </div>
          <div className="text-lg md:text-xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
            "TAP" on Whatsapp Icon and text "HII"
          </div>
          
            <div className="flex justify-center items-center gap-5 text-lg md:text-xl border-2 w-fit text-center mx-auto px-7 py-3 rounded-3xl border-orange-500">
              <div>
                <Image
                  src="/images/whatsapp-logo-2.svg"
                  alt="instagram-log0"
                  height={45}
                  width={45}
                  quality={100}
                  className="cursor-pointer"
                />
              </div>
              <div>+91-1234567890</div>
            </div>
        
          <div className="text-lg md:text-xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent">
            "TAP" on Instagram Icon and text "HII"
          </div>
          <div className="flex justify-center items-center gap-5 text-lg md:text-xl border-2 w-fit text-center mx-auto px-5 py-3 rounded-3xl border-orange-500">
            <div>
              <Image
                src="/images/instagram-2-logo.svg"
                alt="instagram-log0"
                height={90}
                width={90}
                quality={90}
                className="cursor-pointer"
              />
            </div>
            <div>@THE-REAL-WORLD</div>
          </div>
          <div className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent mb-2" />
            You are heartly welcomed at our gym.
          </div>
          <div className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent">VISIT SOON!! </div>
          <div className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent">STAY FIT</div>
          <div className="text-xl md:text-2xl bg-[linear-gradient(90deg,rgba(254,163,0,1)_0%,rgba(245,122,4,1)_45%,rgba(236,79,9,1)_100%)]
            bg-clip-text 
            text-transparent">STAY HAPPY</div>
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500/60 to-transparent" />
        </div>
      </div>
    </>
  );
};

export default Contact;
