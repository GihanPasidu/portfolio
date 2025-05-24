import { useEffect, useRef } from 'react';
import particlesConfig from '../config/particlesConfig';

interface ParticlesBackgroundProps {
  id?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ id = "particles-js" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initParticles = () => {
      if (typeof window !== 'undefined' && 
          typeof (window as any).particlesJS !== 'undefined') {
        
        console.log('Initializing particles.js');
        (window as any).particlesJS(id, particlesConfig);
      } else {
        console.error('particles.js is not loaded!');
        // Try again after a short delay if particles.js isn't loaded yet
        setTimeout(initParticles, 500);
      }
    };

    // First attempt to initialize
    initParticles();

    return () => {
      // No cleanup needed as particles.js doesn't provide a destroy method
    };
  }, [id]);

  return <div id={id} ref={containerRef} className="particles-container" />;
};

export default ParticlesBackground;
