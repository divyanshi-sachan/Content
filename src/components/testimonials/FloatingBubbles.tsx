'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, TrendingUp, Clock, Users } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  metrics: {
    improvement: string;
    timeSaved: string;
    rating: number;
    reach: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Content Creator",
    avatar: "JD",
    quote: "This tool has revolutionized my content creation process. I save hours every week and my engagement has skyrocketed!",
    metrics: {
      improvement: "+150%",
      timeSaved: "8hrs/week",
      rating: 5,
      reach: "50K+"
    }
  },
  {
    id: 2,
    name: "Alice Smith",
    role: "Social Media Manager",
    avatar: "AS",
    quote: "The AI-generated content is incredibly engaging. My social media metrics have improved significantly since using this tool.",
    metrics: {
      improvement: "+200%",
      timeSaved: "10hrs/week",
      rating: 5,
      reach: "100K+"
    }
  },
  {
    id: 3,
    name: "Robert Johnson",
    role: "Digital Marketer",
    avatar: "RJ",
    quote: "The best content repurposing tool I've used. The quality of the generated content is outstanding and saves me so much time.",
    metrics: {
      improvement: "+180%",
      timeSaved: "12hrs/week",
      rating: 5,
      reach: "75K+"
    }
  },
  {
    id: 4,
    name: "Sarah Chen",
    role: "YouTuber",
    avatar: "SC",
    quote: "Game-changing platform for content creators. It helps me maintain consistency across all my social media channels effortlessly.",
    metrics: {
      improvement: "+250%",
      timeSaved: "15hrs/week",
      rating: 5,
      reach: "200K+"
    }
  }
];

const MetricBubble = ({ icon: Icon, value, label, delay, x, y }: any) => (
  <motion.div
    className="absolute bg-gray-900/80 backdrop-blur-sm rounded-full p-3 border border-purple-500/20"
    initial={{ scale: 0, x, y }}
    animate={{ 
      scale: 1,
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
    }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      duration: 3
    }}
  >
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-4 w-4 text-purple-400" />
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  </motion.div>
);

export const FloatingBubbles = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-purple-500/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-24 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Users Say
        </motion.h2>

        <div className="relative max-w-6xl mx-auto h-[600px]">
          {testimonials.map((testimonial, index) => {
            const angle = (index / testimonials.length) * Math.PI * 2;
            const radius = 250;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={testimonial.id}
                className={`absolute left-1/2 top-1/2 ${activeId === testimonial.id ? 'z-10' : 'z-0'}`}
                animate={{
                  x: x + (mousePosition.x - 0.5) * 20,
                  y: y + (mousePosition.y - 0.5) * 20,
                  scale: activeId === testimonial.id ? 1.2 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              >
                <motion.div
                  className="relative -translate-x-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveId(activeId === testimonial.id ? null : testimonial.id)}
                >
                  <div className={`
                    w-64 p-6 rounded-2xl backdrop-blur-md cursor-pointer
                    transition-all duration-300
                    ${activeId === testimonial.id 
                      ? 'bg-gray-900/90 border-purple-500/50' 
                      : 'bg-gray-900/50 border-gray-800/50'}
                    border-2
                  `}>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-purple-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-300 line-clamp-3">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Orbiting Metrics */}
                  <AnimatePresence>
                    {activeId === testimonial.id && (
                      <>
                        <MetricBubble
                          icon={TrendingUp}
                          value={testimonial.metrics.improvement}
                          label="Growth"
                          delay={0}
                          x={-100}
                          y={-80}
                        />
                        <MetricBubble
                          icon={Clock}
                          value={testimonial.metrics.timeSaved}
                          label="Saved"
                          delay={0.1}
                          x={100}
                          y={-80}
                        />
                        <MetricBubble
                          icon={Star}
                          value={testimonial.metrics.rating + "/5"}
                          label="Rating"
                          delay={0.2}
                          x={-100}
                          y={80}
                        />
                        <MetricBubble
                          icon={Users}
                          value={testimonial.metrics.reach}
                          label="Reach"
                          delay={0.3}
                          x={100}
                          y={80}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}; 