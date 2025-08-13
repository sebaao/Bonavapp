'use client';

import React, { useState } from "react";
import { MapPin, Phone, Globe, Clock, Star, X, Info, Utensils, MessageSquare } from "lucide-react";

interface RestaurantModalProps {
  restaurant: any;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: any) => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, isOpen, onClose, onAddReview }) => {
  const [review, setReview] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen || !restaurant) return null;

  const tabs = [
    { id: "details", label: "Details", icon: <Info className="w-4 h-4" /> },
    { id: "menu", label: "Menu", icon: <Utensils className="w-4 h-4" /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Información básica */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">Restaurant Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Location</p>
              <p className="text-gray-600">{restaurant.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Hours</p>
              <p className="text-gray-600">{restaurant.hours}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-gray-600">{restaurant.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">Website</p>
              <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                Visit website
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">About</h3>
        <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Specialties & Features</h3>
        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-[var(--badge-green)]/10 text-[var(--badge-green)] px-3 py-1 rounded-full text-sm font-medium border border-[var(--badge-green)]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap gap-3 pt-4">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.location)}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
        >
          <MapPin className="w-4 h-4" />
          Get Directions
        </a>
        <a 
          href={`tel:${restaurant.phone}`} 
          className="flex items-center gap-2 bg-[var(--badge-green)] hover:bg-[var(--button)] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a 
          href={restaurant.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-[var(--button)] hover:bg-[var(--badge-green)] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
        >
          <Globe className="w-4 h-4" />
          Visit Website
        </a>
      </div>
    </div>
  );

  const renderMenuTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--accent)] mb-2">Our Menu</h3>
        <p className="text-gray-600">Discover our delicious offerings</p>
      </div>
      
      {restaurant.menu.map((section: any) => (
        <div key={section.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="text-xl font-bold text-[var(--badge-green)] mb-4 border-b border-gray-100 pb-2">
            {section.title}
          </h4>
          <div className="space-y-4">
            {section.items.map((item: any) => (
              <div key={item.name} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">{item.name}</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="ml-4">
                  <span className="text-lg font-bold text-[var(--accent)]">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--accent)] mb-2">Customer Reviews</h3>
        <div className="flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="text-lg font-semibold">{restaurant.rating}</span>
          <span className="text-gray-600">({restaurant.reviews.length} reviews)</span>
        </div>
      </div>

      {/* Lista de reviews */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {restaurant.reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400">Be the first to share your experience!</p>
          </div>
        ) : (
          restaurant.reviews.map((review: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {review.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Anonymous User</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulario para agregar review */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-[var(--accent)] mb-3">Add Your Review</h4>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (review.trim()) {
              onAddReview(review);
              setReview("");
            }
          }}
          className="space-y-3"
        >
          <textarea
            placeholder="Share your experience with this restaurant..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] bg-white text-gray-900 resize-none"
            rows={4}
            value={review}
            onChange={e => setReview(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-[var(--accent)] hover:bg-[var(--badge-green)] text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden relative">
        {/* Header con imagen */}
        <div className="relative h-64">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold bg-black/20 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm" 
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
            <div className="flex items-center gap-4">
              <span className="bg-[var(--badge-green)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {restaurant.category}
              </span>
              <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-current" />
                {restaurant.rating}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] bg-[var(--accent)]/5'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-400px)]">
          {activeTab === "details" && renderDetailsTab()}
          {activeTab === "menu" && renderMenuTab()}
          {activeTab === "reviews" && renderReviewsTab()}
        </div>
      </div>
    </div>
  );
};

export default RestaurantModal;