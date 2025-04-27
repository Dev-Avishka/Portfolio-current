import { useState, useEffect } from 'react';
import './styles/app.universal.css';
import './styles/store.css';

// Import icons (you'll need to create or have these icons in your project)
import cloud from '../icons/cloud.png';
import calc from '../icons/calculator.svg';

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
    const [installing, setInstalling] = useState<{[key: string]: boolean}>({});
    const [progress, setProgress] = useState<{[key: string]: number}>({});

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
            description: 'An app with my pics. (Are you a stalker to install this? cause why do you want to see me)',
            icon: cloud
        },
        {
            id: 'calc',
            title: 'Calculator',
            description: 'Do Arithmatic logic',
            icon: calc
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
            // Start installation with progress animation
            setInstalling(prev => ({ ...prev, [appId]: true }));
            setProgress(prev => ({ ...prev, [appId]: 0 }));
            
            // Simulate download progress
            const startTime = Date.now();
            const duration = 1000; // 1 second
            
            const progressInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const currentProgress = Math.min(elapsed / duration, 1);
                
                setProgress(prev => ({ ...prev, [appId]: currentProgress }));
                
                if (currentProgress >= 1) {
                    clearInterval(progressInterval);
                    // Complete installation after animation
                    setTimeout(() => {
                        localStorage.setItem(localStorageKey, 'true');
                        setInstalledApps(prev => ({
                            ...prev,
                            [appId]: true
                        }));
                        setInstalling(prev => {
                            const updated = {...prev};
                            delete updated[appId];
                            return updated;
                        });
                    }, 100);
                }
            }, 30); // Update approximately 33 times per second
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
                    {installing[app.id] ? (
                        <div className="progress-container">
                            <svg className="progress-circle" width="44" height="44" viewBox="0 0 44 44">
                                <circle
                                    className="progress-circle-bg"
                                    cx="22"
                                    cy="22"
                                    r="20"
                                    fill="none"
                                    strokeWidth="4"
                                />
                                <circle
                                    className="progress-circle-path"
                                    cx="22"
                                    cy="22"
                                    r="20"
                                    fill="none"
                                    strokeWidth="4"
                                    strokeDasharray="125.6"
                                    strokeDashoffset={125.6 * (1 - (progress[app.id] || 0))}
                                    transform="rotate(-90 22 22)"
                                />
                            </svg>
                            <span className="progress-text">Installing...</span>
                        </div>
                    ) : (
                        <button 
                            className={`install-button ${installedApps[app.id] ? 'uninstall' : ''}`}
                            onClick={() => toggleInstall(app.id)}
                        >
                            {installedApps[app.id] ? 'Uninstall' : 'Install'}
                        </button>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}