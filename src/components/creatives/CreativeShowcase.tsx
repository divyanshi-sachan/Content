"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InstagramCard } from './InstagramCard';
import { motion } from 'framer-motion';
import { MouseParallax } from 'react-just-parallax';

gsap.registerPlugin(ScrollTrigger);

interface CreativeContent {
  image: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  category: string;
  stats: {
    engagement: number;
    reach: number;
    conversion: number;
  };
}

const creativeContent: CreativeContent[] = [
  {
    image: '/images/image1.png',
    title: 'AI-Generated Social Media Post',
    description: 'Transform your blog into engaging social content',
    likes: 1234,
    comments: 89,
    category: 'social',
    stats: {
      engagement: 92,
      reach: 15000,
      conversion: 4.5
    }
  },
  {
    image: '/images/image2.png',
    title: 'Instagram Carousel',
    description: 'Create beautiful multi-slide posts',
    likes: 2345,
    comments: 156,
    category: 'social',
    stats: {
      engagement: 88,
      reach: 25000,
      conversion: 5.2
    }
  },
  {
    image: '/images/image3.png',
    title: 'Twitter Thread',
    description: 'Convert long-form content into viral threads',
    likes: 3456,
    comments: 234,
    category: 'content',
    stats: {
      engagement: 95,
      reach: 50000,
      conversion: 6.8
    }
  },
];

export const CreativeShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from('.section-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Cards stagger animation
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Particle connections
      const particles = gsap.to('.particle', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        duration: 'random(1, 3)',
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: 'random'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-20 h-20 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: cursorText ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <span className="text-white/70 text-sm">{cursorText}</span>
        </div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900/40 to-blue-900/20 backdrop-blur-3xl">
        {/* Particle Effect */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative">
        <motion.h3 
          className="section-title text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Creative Showcase
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creativeContent.map((content, index) => (
            <motion.div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[index] = el;
              }}
              className="relative"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setCursorText('View Details')}
              onHoverEnd={() => setCursorText('')}
              onClick={() => setSelectedCard(selectedCard === index ? null : index)}
            >
              <MouseParallax>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-gray-900 rounded-xl p-6 ring-1 ring-gray-800/50 backdrop-blur-xl">
                    <InstagramCard {...content} />
                    
                    {/* Stats Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-center items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: selectedCard === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ pointerEvents: selectedCard === index ? 'auto' : 'none' }}
                    >
                      <h4 className="text-2xl font-bold text-white mb-4">{content.title}</h4>
                      <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Engagement</span>
                          <motion.div 
                            className="h-2 bg-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${content.stats.engagement}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Reach</span>
                          <span className="text-white">{content.stats.reach.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Conversion</span>
                          <span className="text-white">{content.stats.conversion}%</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </MouseParallax>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-400 mb-6">
            See how our AI transforms your content into engaging social media posts
          </p>
          <button className="relative group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10">View More Examples</span>
            <div className="absolute inset-0 rounded-full bg-white/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}; 