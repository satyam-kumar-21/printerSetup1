import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const SettingsManagement = ({ showLogo, setShowLogo, showHeader, setShowHeader, allowModelSearch, setAllowModelSearch, showInstallationFailed, setShowInstallationFailed, showCompleteSetup, setShowCompleteSetup, adminStatus }) => {
  return (
    <>
      <Helmet>
        <title>Settings Management | HP Smart App</title>
      </Helmet>
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Settings Management</h2>
      <div className="flex items-center mb-4">
        <input
          id="toggle-header"
          type="checkbox"
          checked={showHeader}
          onChange={e => setShowHeader(e.target.checked)}
          className="mr-3 h-5 w-5 accent-blue-600"
        />
        <label htmlFor="toggle-header" className="text-lg text-gray-700 select-none">
          Show Header for All Users
        </label>
      </div>
      <div className={`flex items-center mb-4 ${!showHeader ? 'opacity-50 pointer-events-none' : ''}`}>
        <input
          id="toggle-logo"
          type="checkbox"
          checked={showLogo}
          onChange={e => setShowLogo(e.target.checked)}
          className="mr-3 h-5 w-5 accent-blue-600"
        />
        <label htmlFor="toggle-logo" className="text-lg text-gray-700 select-none">
          Show HP Logo in Header
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="toggle-model-search"
          type="checkbox"
          checked={allowModelSearch}
          onChange={e => setAllowModelSearch(e.target.checked)}
          className="mr-3 h-5 w-5 accent-blue-600"
        />
        <label htmlFor="toggle-model-search" className="text-lg text-gray-700 select-none">
          Allow Model Search & Next Button
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="toggle-installation-failed"
          type="checkbox"
          checked={showInstallationFailed}
          onChange={e => setShowInstallationFailed(e.target.checked)}
          className="mr-3 h-5 w-5 accent-blue-600"
        />
        <label htmlFor="toggle-installation-failed" className="text-lg text-gray-700 select-none">
          Show Installation Failed Page
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="toggle-complete-setup"
          type="checkbox"
          checked={showCompleteSetup}
          onChange={e => setShowCompleteSetup(e.target.checked)}
          className="mr-3 h-5 w-5 accent-blue-600"
        />
        <label htmlFor="toggle-complete-setup" className="text-lg text-gray-700 select-none">
          Show Complete Setup Page
        </label>
      </div>
      {adminStatus && (
        <div className={`mt-2 text-sm ${adminStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{adminStatus}</div>
      )}
    </div>


    </>
  );
};

export default SettingsManagement;
