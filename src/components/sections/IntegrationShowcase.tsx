'use client';
import { BarChart,  Share2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const platforms = [
  {
    name: "Twitter",
    icon: "/logos/twitter.svg",
    color: "from-blue-400 to-blue-500"
  },
  {
    name: "LinkedIn",
    icon: "/logos/linkedin.svg",
    color: "from-blue-600 to-blue-700"
  },
  {
    name: "Instagram",
    icon: "/logos/instagram.svg",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Facebook",
    icon: "/logos/facebook.svg",
    color: "from-blue-500 to-blue-600"
  }
];

const features = [
  {
    title: "One-Click Connect",
    description: "Securely connect your accounts with a single click. No complex setup needed.",
    icon: Zap
  },
  {
    title: "Smart Publishing",
    description: "Schedule and publish content at optimal times across all platforms.",
    icon: Share2
  },
  {
    title: "Analytics Integration",
    description: "Track performance across platforms in one unified dashboard.",
    icon: BarChart
  }
];

export const IntegrationShowcase = () => {
  return (
    <section className="py-24 px-4 bg-gray-900/50">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with your favorite platforms and tools. Transform and publish content anywhere.
          </p>
        </motion.div>

        {/* Social Platform Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={platform.icon}
                  alt={platform.name}
                  className="w-8 h-8"
                />
                <span className="text-lg font-medium text-gray-200">
                  {platform.name}
                </span>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
            </motion.div>
          ))}
        </div>

        {/* Integration Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-800/50 border border-gray-700"
            >
              <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 