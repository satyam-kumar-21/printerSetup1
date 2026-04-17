import { Routes, Route, Navigate } from 'react-router-dom';
import SettingsManagement from './components/SettingsManagement';
import ModelSearch from './components/ModelSearch';
// import SetupSelect from './components/SetupSelect';
import CompleteSetup from './components/CompleteSetup';
import InstallationFailedPage from './components/InstallationFailedPage';

export default function AppRoutes({ showInstallationFailed, showCompleteSetup }) {
  return (
    <>
      <Routes>
        <Route path="/settings-management" element={<SettingsManagement />} />
        <Route path="/" element={<ModelSearch />} />
        {/* <Route path="/" element={<SetupSelect />} /> */}
        {showCompleteSetup ? (
          <Route path="/complete-setup" element={<CompleteSetup />} />
        ) : (
          <Route path="/complete-setup" element={<Navigate to="/" replace />} />
        )}
        {showInstallationFailed ? (
          <Route path="/installation-failed" element={<InstallationFailedPage />} />
        ) : (
          <Route path="/installation-failed" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </>
  );
}
