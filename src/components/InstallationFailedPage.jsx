import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function InstallationFailedPage() {
  const printer = localStorage.getItem('modelSearchInput') || 'Officejet';

  return (
    <>
      <Helmet>
        <title>Installation Failed | HP Smart App</title>
      </Helmet>
      <div
        className="md:min-h-[91vh] min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-2"
        style={{
          backgroundImage: "url('/hero_background_image.webp')",
        }}
      >
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center animate-fadeIn mt-10 mb-10">
          <div className="bg-gradient-to-br from-red-400 via-pink-500 to-yellow-400 rounded-full p-6 mb-8 shadow-lg flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-5xl text-white drop-shadow-lg"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
            Printer Driver Installation Error
          </h2>
          <div className="text-center text-red-600 font-bold mb-8 text-lg">
            We encountered an issue completing the printer driver installation due to <span className="font-extrabold">error 1603</span>.
          </div>
          <div className="text-center text-black font-extrabold mb-4 text-2xl">
            Contact HP Support to Resolve this Issue
          </div>
          <div className="text-center text-gray-800 mb-6 text-lg">
            Toll-Free (USA/CA): <span className="font-bold text-black text-xl">+1 (855) 618-4642</span>
          </div>
          <button
            className="mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-lg flex items-center justify-center transition-all shadow-xl gap-2 mb-8"
            onClick={() => {
              if (window.jivo_api && typeof window.jivo_api.open === 'function') {
                window.jivo_api.open();
              } else {
                alert('Chat support is not available yet.');
              }
            }}
            type="button"
          >
            <i className="fa-solid fa-comments text-xl"></i> Chat Now <span className="ml-1">&#187;</span>
          </button>
          <div className="text-center text-red-600 font-semibold mt-2 text-base">
            Note: For best results, avoid repeatedly attempting the installation without proper guidance, as it may not resolve the issue. Our experts are here to help you complete the setup correctly.
          </div>
        </div>
      </div>
    </>
  );
}
