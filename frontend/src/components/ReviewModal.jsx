import React from 'react';
import { X, MapPin, Calendar, CheckCircle2, ThumbsUp, Star } from 'lucide-react';

const ReviewModal = ({ review, onClose, onToggleLike, isLiked }) => {
  if (!review) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`} 
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                  {(review.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {review.name || 'Anonymous'}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    {review.country && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {review.country}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {review.date ? new Date(review.date).toLocaleDateString() : 'Unknown date'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {renderStars(review.rating || 0)}
                </div>
                {review.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Purchase
                  </span>
                )}
                {review.is_positive_review === true ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Positive
                  </span>
                ) : review.is_positive_review === false ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Negative
                  </span>
                ) : null}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {review.title || 'Review'}
              </h3>
              
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {review.review || 'No review content'}
                </p>
              </div>
              
              {review.helpful_aug >= 0 && (
                onToggleLike ? (
                  <button 
                    onClick={(e) => onToggleLike(e, review)}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-colors inline-flex border ${
                      isLiked 
                        ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800 font-medium' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{review.helpful_aug} people found this helpful</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 inline-flex">
                    <ThumbsUp className="w-4 h-4 text-blue-500" />
                    <span>{review.helpful_aug} people found this helpful</span>
                  </div>
                )
              )}
            </div>
            
            {review.reviewImage && (
              <div className="sm:w-1/3 flex flex-col gap-3">
                <h4 className="font-semibold text-slate-900 dark:text-white">Review Image</h4>
                <a href={review.reviewImage} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 hover:opacity-90 transition-opacity">
                  <img 
                    src={review.reviewImage} 
                    alt="Review attachment" 
                    className="w-full h-auto object-cover max-h-64"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
