'use client';

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Globe, Clock, Star, X, Info, Utensils, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  hours: string;
  isOpen: boolean;
  priceLevel: number;
  rating: number;
  tags: string[];
  image: string;
  distance: number;
  website: string;
  phone: string;
  menu: Array<{
    title: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
    }>;
  }>;
  reviews: string[];
  verified: boolean;
  createdAt: string;
}

interface RestaurantModalProps {
  restaurant: Restaurant | null;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: string) => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, isOpen, onClose, onAddReview }) => {
  const [review, setReview] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  // Ensure modal is always visible and centered
  React.useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Scroll to top to ensure modal is visible
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      
      // Find modal element and ensure it's in view
      setTimeout(() => {
        const modalElement = document.querySelector('.modal-overlay');
        if (modalElement) {
          modalElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      }, 100);
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !restaurant) return null;

  const tabs = [
    { id: "details", label: "Details", icon: <Info className="w-4 h-4" /> },
    { id: "menu", label: "Menu", icon: <Utensils className="w-4 h-4" /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const renderDetailsTab = () => (
    <div className="space-y-4 sm:space-y-6 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            Restaurant Information
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/60 rounded-lg">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium text-sm sm:text-base truncate">{restaurant.location}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/60 rounded-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium text-sm sm:text-base">{restaurant.hours}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/60 rounded-lg">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium text-sm sm:text-base">{restaurant.phone}</span>
            </div>
            {restaurant.website && (
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/60 rounded-lg">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors text-sm sm:text-base truncate">
                  {restaurant.website}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            Additional Details
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg">
              <span className="text-gray-600 font-medium text-sm sm:text-base">Distance:</span>
              <span className="text-gray-900 font-semibold text-sm sm:text-base">{restaurant.distance} km</span>
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg">
              <span className="text-gray-600 font-medium text-sm sm:text-base">Price Level:</span>
              <span className="text-emerald-600 font-bold text-sm sm:text-base">{"💲".repeat(restaurant.priceLevel)}</span>
            </div>
            <div className="flex items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg">
              <span className="text-gray-600 font-medium text-sm sm:text-base">Status:</span>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                restaurant.isOpen 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900">Tags & Categories</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3 pb-2">
          {restaurant.tags.map((tag: string) => (
            <span key={tag} className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMenuTab = () => (
    <div className="space-y-4 sm:space-y-6 pb-4">
      {restaurant.menu.map((section: any, sectionIndex: number) => (
        <div key={sectionIndex} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-900 border-b border-gray-200 pb-2 sm:pb-3">
            {section.title}
          </h3>
          <div className="space-y-3 sm:space-y-4">
                          {section.items.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/30 hover:bg-white/80 transition-all duration-200">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{item.name}</h4>
                    <span className="text-emerald-600 font-bold text-base sm:text-lg">{item.price}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-4 sm:space-y-6 pb-4">
      <div className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Customer Reviews</h3>
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 bg-white/70 px-3 sm:px-4 py-2 rounded-full">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{restaurant.rating}</span>
          </div>
          <span className="text-gray-600 font-medium text-sm sm:text-base">({restaurant.reviews.length} reviews)</span>
        </div>
      </div>

      {/* Lista de reviews */}
      <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-64 overflow-y-auto">
        {restaurant.reviews.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-lg sm:text-xl text-gray-500 mb-2">No reviews yet</p>
            <p className="text-gray-400 text-sm sm:text-base">Be the first to share your experience!</p>
          </div>
        ) : (
          restaurant.reviews.map((review: string, idx: number) => (
            <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/30">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-base sm:text-lg">
                    {review.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Anonymous User</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{review}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulario para agregar review */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
        <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
          Add Your Review
        </h4>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (review.trim()) {
              onAddReview(review);
              setReview("");
            }
          }}
          className="space-y-3 sm:space-y-4"
        >
          <textarea
            placeholder="Share your experience with this restaurant..."
            className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm text-gray-900 resize-none transition-all duration-200 text-sm sm:text-base"
            rows={3}
            value={review}
            onChange={e => setReview(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
    >
              <div 
          className="modal-content w-full max-w-4xl lg:max-w-5xl max-h-[90vh] sm:max-h-[95vh] bg-white/95 backdrop-blur-md border border-white/30"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header con imagen */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/30 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-black/50" 
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Header content */}
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              {restaurant.verified && (
                <div className="flex items-center gap-1 sm:gap-2 bg-emerald-500/90 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-semibold">Verified</span>
                </div>
              )}
              <div className="flex items-center gap-1 sm:gap-2 bg-white/95 backdrop-blur-sm text-gray-900 px-2 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-sm sm:text-base">{restaurant.rating}</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">{restaurant.name}</h2>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="bg-emerald-500/90 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                {restaurant.category}
              </span>
              <span className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm ${
                restaurant.isOpen 
                  ? 'bg-emerald-500/90 text-white' 
                  : 'bg-red-500/90 text-white'
              }`}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 font-semibold transition-all duration-200 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-450px)]">
          {activeTab === "details" && renderDetailsTab()}
          {activeTab === "menu" && renderMenuTab()}
          {activeTab === "reviews" && renderReviewsTab()}
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;