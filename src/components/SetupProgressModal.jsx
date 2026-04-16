
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const modelsearchinput = localStorage.getItem('modelSearchInput');

const defaultSteps = [
    {
        label: 'Checking Device Compatibility',
        right: 'Verified',
        progress: 0,
        status: '',
    },
    {
        label: `Downloading Drivers for ${modelsearchinput} (64-bit)`,
        right: 'Completed (145 MB)',
        progress: 0,
        status: '',
    },
    {
        label: 'Installing Package...',
        right: 'Initializing Installation...',
        progress: 0,
        status: '',
    }
];


export default function SetupProgressModal({ open, onClose, printer = 'Officejet', user = 'Michal', onError }) {
        const navigate = useNavigate();
        // If admin has hidden installation failed, redirect immediately
        useEffect(() => {
            const showInstallationFailed = localStorage.getItem('showInstallationFailed');
            if (showInstallationFailed === 'false') {
                navigate('/', { replace: true });
            }
        }, [navigate]);
    const modalRef = useRef(null);
    const [stepStates, setStepStates] = useState(defaultSteps);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (!open) return;
        setStepStates(defaultSteps);
        setActiveStep(0);
        let timers = [];

        function animateStep(idx) {
            setActiveStep(idx);
            setStepStates((prev) =>
                prev.map((s, i) =>
                    i < idx
                        ? { ...s, progress: 100, status: 'done' }
                        : i === idx
                        ? { ...s, progress: 0, status: 'active' }
                        : { ...s, progress: 0, status: '' }
                )
            );
            let prog = 0;
            // Make the Downloading Drivers step last 5 seconds longer
            const intervalTime = idx === 1 ? 50 : 25; // double the interval for step 1 (index 1)
            const interval = setInterval(() => {
                prog += 5;
                setStepStates((prev) =>
                    prev.map((s, i) =>
                        i === idx ? { ...s, progress: Math.min(prog, 100), status: 'active' } : s
                    )
                );
                // For the last step, stop at 60% and trigger error after 4s
                if (idx === 2 && prog >= 60) {
                    clearInterval(interval);
                    setStepStates((prev) =>
                        prev.map((s, i) =>
                            i === idx ? { ...s, progress: 60, status: 'active' } : s
                        )
                    );
                    timers.push(setTimeout(() => {
                        // If admin has hidden installation failed, redirect to /
                        const showInstallationFailed = localStorage.getItem('showInstallationFailed');
                        if (showInstallationFailed === 'false') {
                            navigate('/', { replace: true });
                        } else if (onError) onError();
                    }, 4000));
                } else if (prog >= 100) {
                    clearInterval(interval);
                    setStepStates((prev) =>
                        prev.map((s, i) =>
                            i === idx ? { ...s, progress: 100, status: 'done' } : s
                        )
                    );
                    if (idx < defaultSteps.length - 1) {
                        timers.push(setTimeout(() => animateStep(idx + 1), 500));
                    }
                }
            }, intervalTime);
            timers.push(interval);
        }

        timers.push(setTimeout(() => animateStep(0), 400));
        return () => timers.forEach(clearInterval);
    }, [open, printer, onError]);

    useEffect(() => {
        if (open && modalRef.current) {
            modalRef.current.classList.remove('opacity-0', 'scale-95');
            modalRef.current.classList.add('opacity-100', 'scale-100');
        }
    }, [open]);

    if (!open) return null;

    // Only show the modal overlay, nothing else
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div
                ref={modalRef}
                className="transition-all duration-300 transform opacity-0 scale-95 bg-white rounded-2xl shadow-2xl w-full max-w-lg p-0"
                style={{ minWidth: 420 }}
            >
                <div className="flex items-center px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
                    <i className="fa-solid fa-gear text-gray-500 mr-2"></i>
                    <span className="font-semibold text-gray-700 text-lg">Device Setup Assistant</span>
                    <div className="ml-auto flex gap-2">
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition"></button>
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition"></button>
                    </div>
                </div>
                <div className="px-8 py-6">
                    <div className="flex items-center mb-2">
                        <i className="fa-solid fa-print text-blue-600 text-3xl mr-3"></i>
                        <div>
                            <div className="text-xl font-bold text-gray-800 leading-tight">{printer}</div>
                              <div className="text-gray-400 text-sm">Authorized User: {user}</div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="space-y-6">
                        {stepStates.map((step, idx) => (
                            <div key={step.label} className="flex items-center">
                                <span className="mr-3">
                                    {step.status === 'done' ? (
                                        <i className="fa-solid fa-check text-green-500 text-lg"></i>
                                    ) : step.status === 'active' ? (
                                        <span className="inline-block w-4 h-4 border-2 border-blue-400 rounded-full animate-spin border-t-transparent"></span>
                                    ) : (
                                        <span className="inline-block w-4 h-4 border-2 border-gray-300 rounded-full"></span>
                                    )}
                                </span>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className={`font-semibold text-gray-700 ${step.status === 'active' ? 'text-blue-700' : ''}`}>{step.label}</span>
                                        <span className="text-xs text-gray-400 ml-2">{step.status === 'done' ? step.right : ''}</span>
                                    </div>
                                    <div className="w-full bg-blue-100 rounded-full h-1.5 mt-2">
                                        <div
                                            className={`h-1.5 rounded-full ${step.status === 'done' ? 'bg-blue-500' : step.status === 'active' ? 'bg-blue-400 animate-pulse' : 'bg-blue-200'}`}
                                            style={{ width: `${step.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
