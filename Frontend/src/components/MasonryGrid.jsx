import React, { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react';

export default function MasonryGrid({ images, user, onPostClick, onTagClick, onLikeToggle, onSaveToggle, onShareToggle, onAuthPrompt }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full text-center py-16">
        <p className="text-neutral-400 font-medium font-serif italic text-lg">No inspirations found matching your selection.</p>
      </div>
    );
  }

  // Local state for heart pop animation triggering
  const [popHeartId, setPopHeartId] = useState(null);

  const handleLike = async (e, image) => {
    e.stopPropagation();
    if (!user) {
      onAuthPrompt();
      return;
    }
    setPopHeartId(image.id);
    setTimeout(() => setPopHeartId(null), 300);
    if (onLikeToggle) {
      onLikeToggle(image.id);
    }
  };

  const handleSave = async (e, image) => {
    e.stopPropagation();
    if (!user) {
      onAuthPrompt();
      return;
    }
    if (onSaveToggle) {
      onSaveToggle(image.id);
    }
  };

  const handleShare = (e, image) => {
    e.stopPropagation();
    if (onShareToggle) {
      onShareToggle(image.id);
    }
  };

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 w-full">
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid mb-6 flex flex-col group animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Card Container */}
          <div
            onClick={() => onPostClick(image.id)}
            className="relative overflow-hidden rounded-2xl bg-neutral-100 cursor-zoom-in transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-neutral-100"
          >
            {/* Visual Asset */}
            <img
              src={image.imageUrl}
              alt={image.title}
              loading="lazy"
              className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-102"
            />

            {/* Hover Glassmorphic Backdrop overlay - Pinterest style */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 z-10">
              {/* Top Row: Save / Like buttons */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={(e) => handleLike(e, image)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-transform hover:scale-110 active:scale-95 ${
                    image.isLiked
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-white/80 hover:bg-white text-neutral-800'
                  } ${popHeartId === image.id ? 'animate-heart' : ''}`}
                >
                  <Heart className={`h-4.5 w-4.5 ${image.isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => handleSave(e, image)}
                  className={`p-2.5 rounded-full backdrop-blur-md transition-transform hover:scale-110 active:scale-95 ${
                    image.isSaved
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white/80 hover:bg-white text-neutral-800'
                  }`}
                >
                  <Bookmark className={`h-4.5 w-4.5 ${image.isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Bottom Row: Share button & Creator Username */}
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => handleShare(e, image)}
                  className="p-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 backdrop-blur-md hover:scale-110 active:scale-95 transition-transform"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
                <div className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-white tracking-wide">
                  @{image.username || 'creator'}
                </div>
              </div>
            </div>
          </div>

          {/* Details below Card: Title & Tag pills (clickable) */}
          <div className="px-1 py-3 flex flex-col gap-1.5">
            <h3 className="font-bold text-sm text-neutral-900 group-hover:text-primary transition-colors line-clamp-1">
              {image.title || 'Untitled'}
            </h3>
            
            {/* Tags section */}
            {image.tags && image.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {image.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className="text-[10px] font-bold text-neutral-400 hover:text-primary hover:bg-neutral-100 px-2 py-1 rounded-md transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
