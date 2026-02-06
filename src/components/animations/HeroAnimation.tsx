"use client"
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { SignUpButton } from '@clerk/nextjs';
import { ArrowRight, Sparkles, Zap, Share2, Code, Star, Image, Video, FileText, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroAnimation = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState(0);

  // Content previews data
  const previews = [
    {
      title: "Blog Posts",
      icon: <FileText className="w-6 h-6 text-purple-500" />,
      content: (
        <div className="space-y-3">
          <div className="h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4">
            <div className="h-4 w-3/4 bg-purple-500/20 rounded mb-2" />
            <div className="h-3 w-1/2 bg-pink-500/20 rounded" />
          </div>
          <div className="h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
            <div className="h-4 w-2/3 bg-blue-500/20 rounded mb-2" />
            <div className="h-3 w-1/3 bg-purple-500/20 rounded" />
          </div>
        </div>
      )
    },
    {
      title: "Social Media",
      icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
      content: (
        <div className="space-y-3">
          <div className="h-24 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-lg p-4">
            <div className="h-4 w-3/4 bg-pink-500/20 rounded mb-2" />
            <div className="h-3 w-1/2 bg-blue-500/20 rounded" />
          </div>
          <div className="h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4">
            <div className="h-4 w-2/3 bg-purple-500/20 rounded mb-2" />
            <div className="h-3 w-1/3 bg-pink-500/20 rounded" />
          </div>
        </div>
      )
    },
    {
      title: "Video Content",
      icon: <Video className="w-6 h-6 text-blue-500" />,
      content: (
        <div className="space-y-3">
          <div className="h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4">
            <div className="h-4 w-3/4 bg-blue-500/20 rounded mb-2" />
            <div className="h-3 w-1/2 bg-purple-500/20 rounded" />
          </div>
          <div className="h-24 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-lg p-4">
            <div className="h-4 w-2/3 bg-pink-500/20 rounded mb-2" />
            <div className="h-3 w-1/3 bg-blue-500/20 rounded" />
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Text animation
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
        });
      }

      // Button animation
      gsap.from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: 'back.out(1.7)',
      });

      // Image animation
      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
      });

      // Features animation
      if (featuresRef.current) {
        gsap.from(featuresRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 1.2,
          ease: 'power3.out',
        });
      }

      // Floating animation for background elements
      gsap.to('.floating-orb', {
        y: '20px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          amount: 1.5,
        },
      });

      // Interactive cursor effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        gsap.to('.cursor-glow', {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotate previews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % previews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Interactive cursor glow */}
      <div className="cursor-glow fixed w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* Animated background elements */}
      <div className="floating-orb absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="floating-orb absolute top-1/2 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      <div className="floating-orb absolute -bottom-40 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div ref={textRef} className="relative z-10">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Content Creation
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Content
              <br />
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                With AI Magic
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-xl">
              Upload your blog posts or YouTube transcripts and watch as AI transforms them
              into engaging social media content that drives engagement.
            </p>

            <div ref={buttonRef}>
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6 relative group"
                >
                  <span className="relative z-10">Get Started For Free</span>
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </SignUpButton>
            </div>

            {/* Quick features */}
            <div ref={featuresRef} className="mt-12 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors group">
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors group">
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Multi-Platform</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
                <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors group">
                <Star className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>High Quality</span>
              </div>
            </div>
          </div>

          {/* Right side - Flipping Hero image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl transform -rotate-6" />
              
              {/* Main image container */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                {/* Custom hero image with gradient overlay */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-gray-800">
                  {/* Decorative grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                  
                  {/* Content preview elements */}
                  <div className="absolute inset-0 p-8">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {previews[currentView].icon}
                          <span className="text-white font-medium">{previews[currentView].title}</span>
                        </div>
                        <div className="h-8 w-8 bg-pink-500/20 rounded-full" />
                      </div>
                      
                      {/* Content cards */}
                      {previews[currentView].content}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
              </div>
            </div>

            {/* Preview navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {previews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentView(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentView === index 
                      ? 'bg-purple-500 w-4' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-purple-500/10 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-sm text-purple-400">AI Processing</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-pink-500/10 backdrop-blur-sm p-4 rounded-xl border border-pink-500/20 animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                <span className="text-sm text-pink-400">Content Ready</span>
              </div>
            </div>

            {/* Additional floating elements */}
            <div className="absolute top-1/2 -right-12 bg-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 animate-float" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm text-blue-400">Real-time</span>
              </div>
            </div>
            <div className="absolute -bottom-12 left-1/2 bg-green-500/10 backdrop-blur-sm p-3 rounded-xl border border-green-500/20 animate-float" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};