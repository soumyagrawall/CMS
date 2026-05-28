import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';

export default function MasonryGrid({ images, user, onPostClick, onTagClick, onLikeToggle, onSaveToggle, onShareToggle, onAuthPrompt, showLikeCounter }) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full text-center py-20">
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

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 w-full">
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid mb-6 flex flex-col group animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Consolidated Bounding Card Container */}
          <div
            className="overflow-hidden rounded-2xl bg-surface border border-neutral-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col shadow-sm"
          >
            {/* Visual Asset Container */}
            <div
              onClick={() => onPostClick(image.id)}
              className="relative overflow-hidden cursor-zoom-in flex-1"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                loading="lazy"
                className="w-full h-auto object-cover block transition-transform duration-750 group-hover:scale-[1.02]"
              />

              {/* Hover overlay - Pinterest style */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 z-10">
                <div className="bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-[9.5px] font-bold text-white tracking-widest uppercase shadow-sm w-fit self-end">
                  View Curation
                </div>
              </div>
            </div>

            {/* Bounding Bottom Footer Block - Inside Card Border */}
            <div className="p-4 bg-surface flex flex-col gap-2.5">
              
              {/* Post Title */}
              <h3
                onClick={() => onPostClick(image.id)}
                className="font-bold text-[13px] md:text-[14px] text-neutral-800 hover:text-primary transition-colors line-clamp-1 leading-snug cursor-pointer"
              >
                {image.title || 'Untitled'}
              </h3>

              {/* Bottom Interactive Controls Row */}
              <div className="flex items-center justify-between border-t border-neutral-100/60 pt-2.5 mt-0.5">
                
                {/* Left side actions: Heart (Like), Bookmark (Save) & Message (Comment) bubble */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={(e) => handleLike(e, image)}
                      className={`p-1.5 rounded-full transition-transform hover:scale-115 active:scale-90 ${
                        image.isLiked ? 'text-red-500' : 'text-neutral-400 hover:text-neutral-600'
                      } ${popHeartId === image.id ? 'animate-heart' : ''}`}
                    >
                      <Heart className={`h-4.5 w-4.5 ${image.isLiked ? 'fill-current' : ''}`} />
                    </button>
                    {showLikeCounter && (
                      <span className="text-[11px] font-medium text-neutral-500 select-none">{image.likeCount || 0}</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleSave(e, image)}
                    className={`p-1.5 rounded-full transition-transform hover:scale-115 active:scale-90 ${
                      image.isSaved ? 'text-primary border-primary/5' : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    <Bookmark className={`h-4.5 w-4.5 ${image.isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => onPostClick(image.id)}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 transition-transform hover:scale-115 active:scale-90"
                  >
                    <MessageSquare className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Right side creator handle (clickable to search) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (image.username) onTagClick(image.username);
                  }}
                  className="text-[10px] font-bold text-neutral-400 hover:text-primary transition-colors tracking-wide cursor-pointer font-sans"
                >
                  @{image.username || 'creator'}
                </div>

              </div>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}
