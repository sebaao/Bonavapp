'use client';

import React from "react";
import Image from "next/image";
import { Star, MapPin, Clock, TrendingUp, CheckCircle } from "lucide-react";

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

interface RestaurantCardProps {
  restaurant: Restaurant;
  onDetails: (id: string) => void;
}

const tagColors: Record<string, string> = {
  "Vegan": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Vegetarian": "bg-blue-100 text-blue-800 border-blue-200",
  "Keto": "bg-purple-100 text-purple-800 border-purple-200",
  "Gluten-Free": "bg-amber-100 text-amber-800 border-amber-200",
  "Dairy-Free": "bg-sky-100 text-sky-800 border-sky-200",
  "Nut-Free": "bg-orange-100 text-orange-800 border-orange-200",
  "Sugar-Free": "bg-red-100 text-red-800 border-red-200",
  "Low-Sodium": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Seafood Allergy": "bg-rose-100 text-rose-800 border-rose-200",
  "Egg Allergy": "bg-violet-100 text-violet-800 border-violet-200",
  "Celiac": "bg-green-100 text-green-800 border-green-200",
  "Diabetic": "bg-gray-100 text-gray-800 border-gray-200",
  "Halal": "bg-teal-100 text-teal-800 border-teal-200",
  "Kosher": "bg-cyan-100 text-cyan-800 border-cyan-200",
};

const priceLevelToSymbol = (level: number) => "💲".repeat(level);

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onDetails }) => {
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer border border-white/20 overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
      onClick={() => onDetails(restaurant.id)}
    >
      {/* Gradient overlay for modern look */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {restaurant.verified && (
            <div className="flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              <CheckCircle className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 font-bold px-3 py-1.5 rounded-full text-sm shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {restaurant.rating}
        </div>
        
        {/* Status indicator */}
        <div className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
          restaurant.isOpen 
            ? 'bg-emerald-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
            {restaurant.name}
          </h2>
          <p className="text-emerald-600 font-semibold text-sm">
            {restaurant.category}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {restaurant.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {restaurant.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${tagColors[tag] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
            >
              {tag}
            </span>
          ))}
          {restaurant.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
              +{restaurant.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[120px]">{restaurant.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{restaurant.distance} km</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold text-sm">
              {priceLevelToSymbol(restaurant.priceLevel)}
            </span>
            <span className="text-gray-400 text-xs">•</span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{restaurant.hours.split(' ')[0]}</span>
            </div>
          </div>
          
          {/* View Details button */}
          <button
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-200 ease-out shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              onDetails(restaurant.id);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;