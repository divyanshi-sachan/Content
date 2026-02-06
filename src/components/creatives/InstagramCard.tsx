"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Image, Heart, MessageCircle, Share2 } from 'lucide-react';

interface InstagramCardProps {
  image: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
}

export const InstagramCard = ({ image, title, description, likes, comments }: InstagramCardProps) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card ref={cardRef} className="glass border-gray-800 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-200">{description}</p>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-400 hover:text-pink-500 transition-colors">
              <Heart className="h-5 w-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{comments}</span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-purple-500 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}; 