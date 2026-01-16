import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LikeButtonProps {
  slug: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ slug }) => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes-${slug}`);
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10));
      setHasLiked(true); // Simplified: if local storage has it, assume user liked it (demo logic)
    } else {
        // Random starting likes for demo
        setLikes(Math.floor(Math.random() * 50) + 10);
    }
  }, [slug]);

  const handleLike = () => {
    if (hasLiked) return;

    const newLikes = likes + 1;
    setLikes(newLikes);
    setHasLiked(true);
    localStorage.setItem(`likes-${slug}`, newLikes.toString());

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#EF4444', '#F87171']
    });
  };

  return (
    <div className="flex items-center gap-2 mt-8">
      <motion.button
        onClick={handleLike}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
          hasLiked 
            ? 'bg-red-500/10 border-red-500/50 text-red-500' 
            : 'bg-white/5 border-white/10 text-text-secondary hover:border-red-500/50 hover:text-red-500'
        }`}
      >
        <Heart size={20} fill={hasLiked ? "currentColor" : "none"} />
        <span className="font-mono font-medium">{likes}</span>
      </motion.button>
      <span className="text-sm text-text-secondary">
        {hasLiked ? 'Thanks for reading!' : 'Did you like this post?'}
      </span>
    </div>
  );
};
