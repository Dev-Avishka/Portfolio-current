import { useState, useEffect } from 'react';
import './styles/app.universal.css';
import './styles/store.css';

// Import icons (you'll need to create or have these icons in your project)
import cloud from '../icons/cloud.png';


// Define interfaces for our data types
interface StoreApp {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface InstalledApps {
  [key: string]: boolean;
}

export default function Store(){

    const [installedApps, setInstalledApps] = useState<InstalledApps>({});



  // Load installed app states from local storage on component mount
    useEffect(() => {
        const loadInstalledApps = (): void => {
        const apps: InstalledApps = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('installed_')) {
            const appId = key.replace('installed_', '');
            apps[appId] = true;
            }
        }
        setInstalledApps(apps);
        };
        
        loadInstalledApps();
    }, []);
    
    // List of apps available in the store
    const storeApps: StoreApp[] = [
        {
            id: 'cloud',
            title: 'Cloud',
            description: 'An app with my pics. (Are you a stalker to install this)',
            icon: cloud
        }
    ];
    
    // Handle app installation/uninstallation
    const toggleInstall = (appId: string): void => {
        const localStorageKey = `installed_${appId}`;
        
        if (installedApps[appId]) {
        // Uninstall app
        localStorage.removeItem(localStorageKey);
        setInstalledApps(prev => {
            const updated = {...prev};
            delete updated[appId];
            return updated;
        });
        } else {
        // Install app
        localStorage.setItem(localStorageKey, 'true');
        setInstalledApps(prev => ({
            ...prev,
            [appId]: true
        }));
        }
    };
    
    return (
        <div className="app store-app">
        <div className="store-header">
            <h1>App Store</h1>
            <p className="store-subtitle">Discover and install new apps</p>
        </div>
        
        <div className="store-container">
            {storeApps.map(app => (
            <div key={app.id} className="app-card">
                <div className="icon-image store-icon">
                <img src={app.icon} alt={app.title} className="app-icon-img" />
                </div>
                <div className="app-info">
                <h2 className="app-title">{app.title}</h2>
                <p className="app-description">{app.description}</p>
                </div>
                <button 
                className={`install-button ${installedApps[app.id] ? 'uninstall' : ''}`}
                onClick={() => toggleInstall(app.id)}
                >
                {installedApps[app.id] ? 'Uninstall' : 'Install'}
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}