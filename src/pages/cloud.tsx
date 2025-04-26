import { useState, useEffect } from 'react';
import './styles/app.universal.css';
import './styles/cloud.css';

// Define types for gallery items
interface GalleryItem {
  id: number;
  type: 'image' | 'video' | 'unknown';
  src: string;
  alt: string;
}

export default function Cloud(){
  // Typed state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulating loading gallery items
  useEffect(() => {
    // This is just a simulation - in a real app, you'd fetch the actual files
    const mockGalleryItems: GalleryItem[] = [
      { id: 1, type: 'image', src: '/gallery/1.jpg', alt: 'Gallery Image 1' },
      { id: 2, type: 'image', src: '/gallery/2.jpg', alt: 'Gallery Image 2' },
      { id: 3, type: 'image', src: '/gallery/3.jpg', alt: 'Gallery Image 2' },
    ];
    
    // Simulate loading time
    setTimeout(() => {
      setGalleryItems(mockGalleryItems);
      setLoading(false);
    }, 800);
  }, []);

  const openItem = (item: GalleryItem): void => {
    setSelectedItem(item);
    // Don't modify body overflow as it affects the tablet display
  };

  const closeViewer = (): void => {
    setSelectedItem(null);
  };

  return (
    <div className="app">
      <div className="gallery-container">
        <h1 className="gallery-title">Media Gallery</h1>
        
        {loading ? (
          <div className="gallery-loading">
            <p>Loading gallery items...</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {galleryItems.map(item => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => openItem(item)}
              >
                {item.type === 'image' ? (
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="gallery-thumbnail"
                  />
                ) : (
                  <div className="video-thumbnail">
                    {/* Using placeholder images for video thumbnails */}
                    <img 
                      src="/api/placeholder/300/200" 
                      alt={item.alt} 
                      className="gallery-thumbnail"
                    />
                    <div className="play-icon">▶</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tablet-friendly Media Viewer */}
      {selectedItem && (
        <div className="tablet-media-viewer-overlay" onClick={closeViewer}>
          <div className="tablet-media-viewer-content" onClick={(e) => e.stopPropagation()}>
            <button className="tablet-close-button" onClick={closeViewer}>×</button>
            
            {selectedItem.type === 'image' ? (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.alt} 
                className="tablet-viewer-media"
              />
            ) : (
              <video 
                src={selectedItem.src} 
                className="tablet-viewer-media" 
                controls 
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}