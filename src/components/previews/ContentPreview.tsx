'use client';

import { Instagram, Linkedin, Twitter, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PreviewProps {
  caption: string;
  hashtags?: string[];
  platform: string;
  format: string;
}

function InstagramPreview({ caption, hashtags, format }: PreviewProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
        <div>
          <div className="text-sm font-medium text-white">username</div>
          <div className="text-xs text-gray-400">Location</div>
        </div>
      </div>
      {format !== "Story" && (
        <div className="aspect-square bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-600" />
        </div>
      )}
      <div className="space-y-2">
        <p className="text-white whitespace-pre-wrap">{caption}</p>
        <div className="flex flex-wrap gap-1">
          {hashtags?.map((tag) => (
            <span key={tag} className="text-blue-400 text-sm">
              {tag.startsWith('#') ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function LinkedInPreview({ caption, hashtags, format }: PreviewProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700" />
        <div>
          <div className="text-sm font-medium text-white">Professional Name</div>
          <div className="text-xs text-gray-400">Title • Company</div>
        </div>
      </div>
      {format === "Image Post" && (
        <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-600" />
        </div>
      )}
      <div className="space-y-2">
        <p className="text-white whitespace-pre-wrap">{caption}</p>
        <div className="flex flex-wrap gap-1">
          {hashtags?.map((tag) => (
            <span key={tag} className="text-blue-400 text-sm">
              {tag.startsWith('#') ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

function TwitterPreview({ caption, format }: PreviewProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
        <div>
          <div className="text-sm font-medium text-white">Display Name</div>
          <div className="text-xs text-gray-400">@username</div>
        </div>
      </div>
      {format === "Image Tweet" && (
        <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-600" />
        </div>
      )}
      <div className="space-y-2">
        {format === "Thread" ? (
          caption.split("\n\n").map((tweet, i) => (
            <div key={i} className="p-3 rounded bg-gray-900/50">
              <p className="text-white whitespace-pre-wrap">{tweet}</p>
            </div>
          ))
        ) : (
          <p className="text-white whitespace-pre-wrap">{caption}</p>
        )}
      </div>
    </Card>
  );
}

export function ContentPreview(props: PreviewProps) {
  switch (props.platform) {
    case "instagram":
      return <InstagramPreview {...props} />;
    case "linkedin":
      return <LinkedInPreview {...props} />;
    case "twitter":
      return <TwitterPreview {...props} />;
    default:
      return null;
  }
} 