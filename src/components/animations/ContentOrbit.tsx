"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { FileText, Sparkles, MessageSquare, Video, Image as ImageIcon } from "lucide-react";

const ORBIT_RADIUS = 180;
const PLANET_HEIGHT = 208; // 52 * 4 (h-52)
const ORBIT_GAP = 24; 
const SUN_RADIUS = 64;
const TRAIL_LENGTH = 16; 
const PARTICLE_UPDATE_INTERVAL = 30; 

const planets = [
  {
    title: "Blog Post",
    img: "/images/image1.png",
    icon: <FileText className="h-8 w-8 text-purple-400" />,
    color: "from-purple-500 to-pink-500",
    orbitColor: "#e879f9",
    description: "Transform your ideas into engaging articles",
    angle: 0,
    speed: 20,
  },
  {
    title: "Social Media",
    img: "/images/image2.png",
    icon: <MessageSquare className="h-8 w-8 text-pink-400" />,
    color: "from-pink-500 to-purple-500",
    orbitColor: "#ec4899",
    description: "Create viral social media content",
    angle: 90,
    speed: 20,
  },
  {
    title: "Video Content",
    img: "/images/image3.png",
    icon: <Video className="h-8 w-8 text-blue-400" />,
    color: "from-blue-500 to-purple-500",
    orbitColor: "#60a5fa",
    description: "Produce captivating video content",
    angle: 180,
    speed: 20,
  },
  {
    title: "Visual Content",
    img: "/images/image2.png",
    icon: <ImageIcon className="h-8 w-8 text-green-400" />,
    color: "from-green-500 to-purple-500",
    orbitColor: "#4ade80",
    description: "Design stunning visual content",
    angle: 270,
    speed: 20,
  },
];

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export const ContentOrbit = () => {
  const orbitRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const sunRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<{x:number,y:number,delay:number}[]>([]);
  const [stars, setStars] = useState<{left: string; top: string; width: string; height: string; opacity: number; animation: string}[]>([]);
  const [bubbles, setBubbles] = useState<{id: number; x: number; y: number; size: number; speed: number; delay: number}[]>([]);
  const [activeOrbit, setActiveOrbit] = useState<number | null>(null);
  const [trails, setTrails] = useState<{planetIndex: number; particles: {x: number; y: number; opacity: number; size: number}[]}[]>([]);
  const [sunActive, setSunActive] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);

  useEffect(() => {
    const newStars = Array.from({ length: 40 }).map(() => {
      const left = `${randomBetween(0, 100)}%`;
      const top = `${randomBetween(0, 100)}%`;
      const width = `${randomBetween(1, 2.5)}px`;
      const height = `${randomBetween(1, 2.5)}px`;
      const opacity = randomBetween(0.3, 0.8);
      const animation = `twinkle ${randomBetween(2, 5)}s infinite ${randomBetween(0, 5)}s`;
      return { left, top, width, height, opacity, animation };
    });
    setStars(newStars);
  }, []);

  // Function to update particle trails
  const updateTrails = useCallback(() => {
    setTrails(prevTrails => {
      return planets.map((planet, index) => {
        const orbitRef = orbitRefs[index].current;
        if (!orbitRef) return { planetIndex: index, particles: [] };

        const rect = orbitRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const currentRotation = parseFloat(orbitRef.style.transform?.match(/rotate\(([-\d.]+)deg\)/)?.[1] || '0');
        const radians = (currentRotation * Math.PI) / 180;
        
        const x = centerX + ORBIT_RADIUS * Math.cos(radians);
        const y = centerY + ORBIT_RADIUS * Math.sin(radians);

        const prevParticles = prevTrails.find(t => t.planetIndex === index)?.particles || [];
        const newParticles = [
          { 
            x: x + randomBetween(-2, 2), // Add slight randomness to x position
            y: y + randomBetween(-2, 2), // Add slight randomness to y position
            opacity: 1,
            size: randomBetween(3, 6) // Random size for each particle
          },
          ...prevParticles.slice(0, TRAIL_LENGTH - 1).map(p => ({
            ...p,
            opacity: p.opacity * 0.92 // Slower fade (changed from 0.85)
          }))
        ];

        return { planetIndex: index, particles: newParticles };
      });
    });
  }, []);

  useEffect(() => {
    const trailInterval = setInterval(updateTrails, PARTICLE_UPDATE_INTERVAL);
    return () => clearInterval(trailInterval);
  }, [updateTrails]);

  // Remove the planet rotation animation
  useEffect(() => {
    // Only animate sun pulse
    if (sunRef.current) {
      gsap.to(sunRef.current, {
        scale: 1.08,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut"
      });
    }

    // Set initial positions for planets
    orbitRefs.forEach((ref, i) => {
      if (!ref.current) return;
      gsap.set(ref.current, {
        rotation: planets[i].angle,
      });
    });

    // Sparkles setup
    setSparkles(Array.from({length: 18}).map(() => ({
      x: randomBetween(-180, 180),
      y: randomBetween(-180, 180),
      delay: randomBetween(0, 4)
    })));
  }, []);

  // Parallax tilt effect
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 30;
      const y = ((e.clientY / innerHeight) - 0.5) * 30;
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Function to create bubbles
  const createBubbles = (planetIndex: number) => {
    const newBubbles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: randomBetween(-40, 40),
      y: randomBetween(-20, 20),
      size: randomBetween(6, 16),
      speed: randomBetween(1.5, 3),
      delay: i * 0.15
    }));
    setBubbles(prev => [...prev, ...newBubbles]);
    
    // Remove bubbles after animation
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => !newBubbles.find(nb => nb.id === b.id)));
    }, 3000);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated Nebula/Gradient Background + Twinkling Stars */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-gray-900/90 to-blue-900/80 animate-gradient" />
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70"
            style={star}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto relative">
        {/* Title Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent relative z-20">
            Transform Your Content
            <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </h3>
        </div>

        {/* Orbit System Container */}
        <div className="relative w-full aspect-square max-w-[800px] mx-auto">
          {/* Planet Preview Modal */}
          {hoveredPlanet !== null && (
            <div className="fixed inset-0 pointer-events-none z-50"
              style={{
                perspective: "1000px",
                perspectiveOrigin: "50% 50%"
              }}
            >
              <div 
                className="absolute right-8 top-1/2 -translate-y-1/2 w-80 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl transform transition-all duration-500"
                style={{
                  transform: `translateZ(20px) rotateY(-5deg)`,
                  opacity: hoveredPlanet !== null ? 1 : 0,
                }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  {planets[hoveredPlanet]?.icon}
                  <h4 className="text-xl font-bold text-white">{planets[hoveredPlanet]?.title}</h4>
                </div>
                <p className="text-gray-300 mb-4">{planets[hoveredPlanet]?.description}</p>
                <div className="h-0.5 w-full bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-full mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Click to explore</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${planets[hoveredPlanet]?.color}`}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orbit System */}
          <div 
            ref={systemRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotateY(${parallax.x}deg) rotateX(${-parallax.y}deg)`
            }}
          >
            {/* Orbit lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="absolute pointer-events-none"
                width={(ORBIT_RADIUS * 2)}
                height={(ORBIT_RADIUS * 2)}
                style={{zIndex: 0}}
              >
                {planets.map((planet, i) => (
                  <circle
                    key={i}
                    cx={ORBIT_RADIUS}
                    cy={ORBIT_RADIUS}
                    r={ORBIT_RADIUS-2}
                    stroke={activeOrbit === i ? planet.orbitColor : "#a78bfa55"}
                    strokeWidth={activeOrbit === i ? "3" : "2"}
                    fill="none"
                    strokeDasharray="8 8"
                    className="transition-all duration-300"
                    style={{
                      filter: activeOrbit === i ? `drop-shadow(0 0 8px ${planet.orbitColor})` : "none",
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* Particle Trails */}
            {trails.map((trail, planetIndex) => (
              <div key={`trail-${planetIndex}`} className="absolute left-0 top-0 pointer-events-none" style={{ zIndex: 1 }}>
                {trail.particles.map((particle, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: particle.x,
                      top: particle.y,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      opacity: particle.opacity,
                      backgroundColor: planets[planetIndex].orbitColor,
                      transform: 'translate(-50%, -50%)',
                      filter: `blur(${(1 - particle.opacity) * 2}px)`,
                      boxShadow: `0 0 ${particle.size * 2}px ${planets[planetIndex].orbitColor}`,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Planets */}
            {planets.map((planet, i) => (
              <div
                key={planet.title}
                ref={orbitRefs[i]}
                className="absolute left-1/2 top-1/2"
                style={{ 
                  width: 0, 
                  height: 0, 
                  zIndex: 2, 
                  transform: `rotate(${planet.angle}deg)`,
                  transformOrigin: "0 0"
                }}
              >
                <div
                  style={{ transform: `translateY(-${ORBIT_RADIUS + ORBIT_GAP + PLANET_HEIGHT/2}px)` }}
                  onMouseEnter={() => {
                    setActiveOrbit(i);
                    setHoveredPlanet(i);
                    createBubbles(i);
                  }}
                  onMouseLeave={() => {
                    setActiveOrbit(null);
                    setHoveredPlanet(null);
                  }}
                >
                  <div 
                    className="group w-40 h-52 rounded-2xl border border-gray-800 shadow-xl bg-gray-900/80 backdrop-blur-sm flex flex-col items-center p-4 relative transition-all duration-500 hover:scale-110 hover:z-20 hover:shadow-2xl cursor-pointer"
                    style={{ 
                      boxShadow: `0 8px 32px 0 rgba(128,0,255,0.10)${hoveredPlanet === i ? ', 0 0 40px ' + planet.orbitColor + '40' : ''}`,
                      filter: "drop-shadow(0 8px 32px #a78bfa33)",
                      transform: `rotate(${-planet.angle}deg)`
                    }}
                  >
                    <div className="w-full h-24 rounded-lg overflow-hidden mb-3 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={planet.img} 
                        alt={planet.title} 
                        className="w-full h-full object-cover group-hover:grayscale-0 grayscale transition-all duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex items-center space-x-2 mb-1 relative z-10">
                      {planet.icon}
                      <span className="text-white font-semibold text-base planet-label group-hover:scale-110 transition-transform duration-300">
                        {planet.title}
                      </span>
                    </div>
                    {/* Hover effects */}
                    <div className="absolute -inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${planet.color} blur-lg opacity-40`} />
                      <div className="absolute inset-0 rounded-2xl border border-white/20" />
                    </div>
                    {/* Hover content preview */}
                    <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="h-0.5 w-full bg-gradient-to-r from-white/5 via-white/20 to-white/5 rounded-full mb-2" />
                      <p className="text-xs text-white/70 text-center">Click to explore</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* AI Sun */}
            <div 
              ref={sunRef} 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              onMouseEnter={() => setSunActive(true)}
              onMouseLeave={() => setSunActive(false)}
            >
              <div className={`transition-transform duration-500 ${sunActive ? 'scale-110' : ''}`}>
                <div className="relative flex items-center justify-center">
                  {/* Enhanced animated rays/halo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="160" height="160" viewBox="0 0 160 160" className={`transition-all duration-500 ${sunActive ? 'animate-spin-slower scale-110' : 'animate-spin-slow'}`}>
                      <defs>
                        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
                        </radialGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="80" cy="80" r="70" fill="none" stroke="url(#halo)" strokeWidth="8" filter="url(#glow)" />
                      {/* Dynamic rays */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <line
                          key={i}
                          x1="80"
                          y1="10"
                          x2="80"
                          y2="30"
                          stroke="#fff"
                          strokeWidth="4"
                          strokeLinecap="round"
                          transform={`rotate(${i * 30} 80 80)`}
                          className={`transition-opacity duration-300 ${sunActive ? 'opacity-100' : 'opacity-50'}`}
                          style={{ filter: 'url(#glow)' }}
                        />
                      ))}
                    </svg>
                  </div>
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-2xl flex items-center justify-center animate-pulse relative transition-all duration-500 ${sunActive ? 'shadow-purple-500/50' : ''}`}>
                    <Sparkles className={`h-16 w-16 text-white drop-shadow-xl transition-all duration-500 ${sunActive ? 'scale-110 animate-spin-slower' : 'animate-spin-slow'}`} />
                    <div className={`absolute inset-0 rounded-full bg-white/10 blur-2xl transition-opacity duration-500 ${sunActive ? 'opacity-70' : 'opacity-30'}`} />
                  </div>
                </div>
                <span className={`block text-purple-300 font-semibold text-center text-base mt-2 tracking-wide transition-all duration-300 ${sunActive ? 'text-white scale-110' : ''}`}>
                  AI Magic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes sparkle-float {
          0% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.7; transform: scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-planet {
          animation: pulse-planet 3.5s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse-planet {
          0%, 100% { box-shadow: 0 8px 32px 0 rgba(128,0,255,0.10); }
          50% { box-shadow: 0 16px 48px 0 rgba(168,139,250,0.25); }
        }
        @keyframes float-up {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            transform: translate(calc(-50% + ${randomBetween(-30, 30)}px), calc(-50% - 20px)) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(-50% + ${randomBetween(-50, 50)}px), calc(-50% - 120px)) scale(0.5);
            opacity: 0;
          }
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
        @keyframes particle-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-spin-slower {
          animation: spin 12s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { filter: brightness(1) blur(2px); }
          50% { filter: brightness(1.2) blur(4px); }
        }
      `}</style>
    </section>
  );
}; 

