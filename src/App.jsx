

import React, { useState, useEffect, useRef } from 'react';
import AdminLogin from './components/AdminLogin';
import Header from './components/Header';
import AppRoutes from './AppRoutes';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SettingsManagement from './components/SettingsManagement';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function App() {
  const navigate = useNavigate();

  // Copy 'issue' and 'connection' from URL query params, hash, or sessionStorage to localStorage on load (cross-domain relay)
  useEffect(() => {
    setTimeout(() => {
      // Read from query parameters first
      const params = new URLSearchParams(window.location.search);
      const issueFromParams = params.get('issue');
      const connectionFromParams = params.get('connection');

      if (issueFromParams) {
        localStorage.setItem('issue', issueFromParams);
      }
      if (connectionFromParams) {
        localStorage.setItem('connection', connectionFromParams);
      }
      // Clean query params from URL
      if (issueFromParams || connectionFromParams) {
        history.replaceState(null, '', window.location.pathname);
      }

      // Fallback: hash parsing
      const hash = window.location.hash;
      if (hash && hash.startsWith('#issue=')) {
        const issueFromHash = decodeURIComponent(hash.substring(7));
        if (issueFromHash) {
          localStorage.setItem('issue', issueFromHash);
          history.replaceState(null, '', window.location.pathname);
        }
      }

      // Fallback: sessionStorage relay
      const issue = sessionStorage.getItem('issue');
      if (issue) {
        localStorage.setItem('issue', issue);
        sessionStorage.removeItem('issue');
      }
    }, 0);
  }, []);
  // showLogo: controls logo in header; showHeader: controls header visibility

  const [showLogo, setShowLogo] = useState(false); // default: don't show logo instantly
  const [showHeader, setShowHeader] = useState(false); // default: hide header until backend confirms
  const [allowModelSearch, setAllowModelSearch] = useState(true);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [showInstallationFailed, setShowInstallationFailed] = useState(false);
  const [showCompleteSetup, setShowCompleteSetup] = useState(false);
  const [adminStatus, setAdminStatus] = useState('');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const intervalRef = useRef();

  // Always fetch header and logo visibility from backend on every page load and every 10 seconds
  useEffect(() => {
    const fetchHeader = () => {
      fetch(`${BACKEND_URL}/admin/header-visibility`)
        .then(res => res.json())
        .then(data => {
          setShowHeader(data.showHeader);
          setShowLogo(data.showLogo);
          setAllowModelSearch(data.allowModelSearch !== false);
          setShowInstallationFailed(data.showInstallationFailed !== false);
          setShowCompleteSetup(data.showCompleteSetup !== false);
          setSettingsLoaded(true);
        })
        .catch(() => {
          setShowHeader(false);
          setShowLogo(false);
          setAllowModelSearch(true);
          setShowInstallationFailed(false);
          setShowCompleteSetup(false);
          setSettingsLoaded(true);
        });
    };
    fetchHeader();
    intervalRef.current = setInterval(fetchHeader, 10000); // Poll every 10s for live update
    return () => clearInterval(intervalRef.current);
  }, []);

  // Handler for toggling Installation Failed page visibility
  const handleSetShowInstallationFailed = (val) => {
    setShowInstallationFailed(val);
    setAdminStatus('');
    const token = localStorage.getItem('adminToken');
    if (adminLoggedIn && token) {
      fetch(`${BACKEND_URL}/admin/header-visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ showHeader, showLogo, allowModelSearch, showInstallationFailed: val, showCompleteSetup })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setAdminStatus('Settings updated successfully.');
          else setAdminStatus('Failed to update settings.');
        })
        .catch(() => setAdminStatus('Failed to update settings.'));
    }
  };

  // Handler for toggling Complete Setup page visibility
  const handleSetShowCompleteSetup = (val) => {
    setShowCompleteSetup(val);
    setAdminStatus('');
    const token = localStorage.getItem('adminToken');
    if (adminLoggedIn && token) {
      fetch(`${BACKEND_URL}/admin/header-visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ showHeader, showLogo, allowModelSearch, showInstallationFailed, showCompleteSetup: val })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setAdminStatus('Settings updated successfully.');
          else setAdminStatus('Failed to update settings.');
        })
        .catch(() => setAdminStatus('Failed to update settings.'));
    }
  };

  // Update backend when admin changes header or logo visibility
  const handleSetShowHeader = (val) => {
    setShowHeader(val);
    setAdminStatus('');
    const token = localStorage.getItem('adminToken');
    if (adminLoggedIn && token) {
      fetch(`${BACKEND_URL}/admin/header-visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ showHeader: val, showLogo, allowModelSearch })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setAdminStatus('Settings updated successfully.');
          else setAdminStatus('Failed to update settings.');
        })
        .catch(() => setAdminStatus('Failed to update settings.'));
    }
  };

  const handleSetShowLogo = (val) => {
    setShowLogo(val);
    setAdminStatus('');
    const token = localStorage.getItem('adminToken');
    if (adminLoggedIn && token) {
      fetch(`${BACKEND_URL}/admin/header-visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ showHeader, showLogo: val, allowModelSearch })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setAdminStatus('Settings updated successfully.');
          else setAdminStatus('Failed to update settings.');
        })
        .catch(() => setAdminStatus('Failed to update settings.'));
    }
  };

  const handleSetAllowModelSearch = (val) => {
    setAllowModelSearch(val);
    setAdminStatus('');
    const token = localStorage.getItem('adminToken');
    if (adminLoggedIn && token) {
      fetch(`${BACKEND_URL}/admin/header-visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ showHeader, showLogo, allowModelSearch: val })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setAdminStatus('Settings updated successfully.');
          else setAdminStatus('Failed to update settings.');
        })
        .catch(() => setAdminStatus('Failed to update settings.'));
    }
  };

  // Admin login handler
  const handleAdminLogin = (username, password) => {
    fetch(`${BACKEND_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials');
        return res.json();
      })
      .then((data) => {
        setAdminLoggedIn(true);
        setLoginError('');
        localStorage.setItem('adminToken', data.token);
      })
      .catch(() => {
        setLoginError('Invalid username or password');
      });
  };

  // Redirect to / if /installation-failed is not allowed
  useEffect(() => {
    if (!showInstallationFailed && location.pathname === '/installation-failed') {
      navigate('/', { replace: true });
    }
    if (!showCompleteSetup && location.pathname === '/complete-setup') {
      navigate('/', { replace: true });
    }
  }, [showInstallationFailed, showCompleteSetup, location.pathname, navigate]);

  // Show Footer on root (/) and /complete-setup routes
  const showFooter = location.pathname === '/' || location.pathname === '/complete-setup';

  // Render SettingsManagement directly for /settings-management, else normal flow
  if (!settingsLoaded) {
    return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (location.pathname === '/settings-management') {
    return (
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        {adminLoggedIn ? (
          <>
            {showHeader && <Header showLogo={showLogo} />}
            <main className="flex-grow w-full">
              <SettingsManagement
                showLogo={showLogo}
                setShowLogo={handleSetShowLogo}
                showHeader={showHeader}
                setShowHeader={handleSetShowHeader}
                allowModelSearch={allowModelSearch}
                setAllowModelSearch={handleSetAllowModelSearch}
                showInstallationFailed={showInstallationFailed}
                setShowInstallationFailed={handleSetShowInstallationFailed}
                showCompleteSetup={showCompleteSetup}
                setShowCompleteSetup={handleSetShowCompleteSetup}
                adminStatus={adminStatus}
              />
            </main>
          </>
        ) : (
          <AdminLogin onLogin={handleAdminLogin} error={loginError} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {showHeader && <Header showLogo={showLogo} />}
      <main className="flex-grow w-full">
        <AppRoutes showInstallationFailed={showInstallationFailed} showCompleteSetup={showCompleteSetup} />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
