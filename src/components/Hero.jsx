import React from 'react';

const Hero = () => {
  return (
    <section
      className="flex flex-col items-center justify-center text-center min-h-[320px] w-full"
      style={{
        backgroundImage: "url('/hero_background_image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '320px',
        width: '100%'
      }}
    >
      <h2 className="text-white text-5xl font-extrabold mt-8 mb-4 drop-shadow">Smart Printer Setup & Troubleshooting</h2>
      <p className="text-gray-200 text-xl mb-6">Set Up & Troubleshoot Your Printer in Minutes</p>
      <div className="flex gap-6 justify-center mt-2">
        <span className="flex items-center text-green-600 font-bold text-lg">
          <i className="fa-solid fa-bolt mr-2"></i> Quick Setup
        </span>
        <span className="flex items-center text-green-600 font-bold text-lg">
          <i className="fa-solid fa-screwdriver-wrench mr-2"></i> Easy Troubleshooting
        </span>
      </div>
    </section>
  );
};

export default Hero;
