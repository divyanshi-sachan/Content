'use client';

import { JSX, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Code, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
  step: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  features: string[];
  demo?: JSX.Element;
}

const steps: TimelineStep[] = [
  {
    step: 1,
    title: "Upload Content",
    description: "Paste your blog post or YouTube transcript",
    icon: <FileText className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    features: ["Drag & Drop Support", "Multiple Formats", "Instant Processing"],
    demo: (
      <div className="relative w-full h-32 bg-gray-800/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-purple-400" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 upload-progress" />
      </div>
    )
  },
  {
    step: 2,
    title: "AI Processing",
    description: "Our AI analyzes and transforms your content",
    icon: <Code className="h-8 w-8" />,
    color: "from-blue-500 to-purple-500",
    features: ["Smart Analysis", "Content Optimization", "Format Conversion"],
    demo: (
      <div className="relative w-full h-32 bg-gray-800/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="processing-circles">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-blue-500/30"
                style={{
                  width: `${(i + 1) * 30}px`,
                  height: `${(i + 1) * 30}px`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            <Code className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>
    )
  },
  {
    step: 3,
    title: "Get Results",
    description: "Download your social media-ready content",
    icon: <Rocket className="h-8 w-8" />,
    color: "from-pink-500 to-orange-500",
    features: ["Multiple Formats", "Ready to Post", "Analytics Included"],
    demo: (
      <div className="relative w-full h-32 bg-gray-800/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="result-cards">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-24 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-lg transform"
                style={{
                  transform: `translateX(${(i - 1) * 60}px) rotate(${(i - 1) * 5}deg)`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            <Rocket className="h-8 w-8 text-pink-400 animate-float" />
          </div>
        </div>
      </div>
    )
  }
];

export const InteractiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the progress line
      gsap.from(".timeline-progress", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        scaleY: 0,
        transformOrigin: "top"
      });

      // Animate each step with a staggered entrance
      steps.forEach((_, index) => {
        gsap.from(`.step-${index}`, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
            once: true,
          },
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      {/* Timeline Progress Line */}
      <motion.div
        className="absolute left-12 top-0 w-1 h-full bg-gray-800"
      >
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500"
          style={{ height: progressHeight }}
        />
      </motion.div>

      {/* Steps */}
      {steps.map((step, index) => (
        <motion.div
          key={step.step}
          className={`relative mb-16 last:mb-0 step-${index}`}
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-8">
            {/* Step Number */}
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`h-24 w-24 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 transform transition-transform duration-300 hover:rotate-6`}>
                <div className="h-full w-full rounded-2xl bg-gray-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
                  <div className="text-4xl font-bold text-white relative z-10">{step.step}</div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${step.color} text-white`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.icon}
                  </motion.div>
                  <h4 className="text-2xl font-semibold text-white">{step.title}</h4>
                </div>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                {/* Interactive Demo */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.demo}
                </motion.div>

                <div className="grid grid-cols-3 gap-4">
                  {step.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      <style jsx global>{`
        .upload-progress {
          animation: upload 2s ease-in-out infinite;
          transform-origin: left;
        }

        @keyframes upload {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }

        .processing-circles div {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .result-cards div {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}; 