import { useState } from 'react';
import './styles/app.universal.css';
import './styles/resume.css';

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const resumePath = "/resume.pdf";

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className='app'>
      <div className="resume-container">
        <div className="resume-header">
          <h1>My Resume</h1>
          <a 
            href={resumePath} 
            download="resume.pdf" 
            className="download-button"
          >
            Download Resume
          </a>
        </div>
        
        <div className="pdf-container">
          {isLoading && (
            <div className="loading">
              <p>Loading resume...</p>
            </div>
          )}
          <iframe 
            src={resumePath}
            className="pdf-viewer" 
            title="Resume PDF"
            onLoad={handleLoad}
          />
        </div>
      </div>
    </div>
  );
}