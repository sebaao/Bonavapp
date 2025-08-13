'use client';

import React from "react";
import Image from "next/image";

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
  "Vegan": "bg-[var(--badge-green)] text-white",
  "Vegetarian": "bg-[var(--badge-blue)] text-white",
  "Keto": "bg-[var(--badge-purple)] text-white",
  "Gluten-Free": "bg-[var(--badge-yellow)] text-white",
  "Dairy-Free": "bg-[var(--badge-blue)] text-white",
  "Nut-Free": "bg-[var(--badge-orange)] text-white",
  "Sugar-Free": "bg-[var(--badge-red)] text-white",
  "Low-Sodium": "bg-[var(--badge-blue)] text-white",
  "Seafood Allergy": "bg-[var(--badge-red)] text-white",
  "Egg Allergy": "bg-[var(--badge-purple)] text-white",
  "Celiac": "bg-[var(--badge-green)] text-white",
  "Diabetic": "bg-gray-700 text-white",
  "Halal": "bg-[var(--badge-green)] text-white",
  "Kosher": "bg-[var(--badge-purple)] text-white",
};

const tagIcons: Record<string, React.ReactNode> = {
  "Vegan": <span role="img" aria-label="Vegan">🌱</span>,
  "Vegetarian": <span role="img" aria-label="Vegetarian">🥦</span>,
  "Keto": <span role="img" aria-label="Keto">🥚</span>,
  "Gluten-Free": <span role="img" aria-label="Gluten-Free">🚫🌾</span>,
  "Dairy-Free": <span role="img" aria-label="Dairy-Free">🚫🥛</span>,
  "Nut-Free": <span role="img" aria-label="Nut-Free">🚫🥜</span>,
  "Sugar-Free": <span role="img" aria-label="Sugar-Free">🚫🍬</span>,
  "Low-Sodium": <span role="img" aria-label="Low-Sodium">🧂⬇️</span>,
  "Seafood Allergy": <span role="img" aria-label="Seafood Allergy">🚫🦐</span>,
  "Egg Allergy": <span role="img" aria-label="Egg Allergy">🚫🥚</span>,
  "Celiac": <span role="img" aria-label="Celiac">🚫🌾</span>,
  "Diabetic": <span role="img" aria-label="Diabetic">🩸</span>,
  "Halal": <span role="img" aria-label="Halal">🕌</span>,
  "Kosher": <span role="img" aria-label="Kosher">✡️</span>,
};

const priceLevelToSymbol = (level: number) => "💲".repeat(level);

const infoIcons = {
  location: <span role="img" aria-label="Dirección">📍</span>,
  hours: <span role="img" aria-label="Horario">⏰</span>,
  distance: <span role="img" aria-label="Distancia">🚶</span>,
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onDetails }) => {
  return (
    <div className="bg-white text-[var(--foreground)] rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 border border-[var(--secondary)] hover:shadow-xl hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-2">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          width={400}
          height={225}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-[var(--badge-green)] text-white text-xs font-bold px-3 py-1 rounded-full shadow">✓ Verified</span>
        <span className="absolute top-3 right-3 bg-white/90 text-[var(--accent)] font-bold px-2 py-1 rounded-full text-sm shadow flex items-center gap-1">
          <span role="img" aria-label="Estrella">⭐️</span> {restaurant.rating}
        </span>
      </div>
      <h2 className="text-base sm:text-lg font-bold mb-1 truncate">{restaurant.name}</h2>
      <span className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">{restaurant.category}</span>
      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-1">{restaurant.description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {restaurant.tags.map((tag: string) => (
          <span
            key={tag}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${tagColors[tag] || 'bg-gray-200 text-gray-700'}`}
          >
            {tagIcons[tag] || null} {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500 mb-2">
        <span className="truncate">{infoIcons.location} {restaurant.location}</span>
        <span className="truncate">{infoIcons.hours} {restaurant.hours} {restaurant.isOpen ? <span className="text-[var(--badge-green)]">(Open)</span> : <span className="text-red-400">(Closed)</span>}</span>
        <span className="text-[var(--badge-green)] font-bold">{priceLevelToSymbol(restaurant.priceLevel)}</span>
        <span>{infoIcons.distance} {restaurant.distance} km</span>
      </div>
      <button
        className="mt-auto bg-[var(--button)] hover:bg-[var(--primary)] text-white font-bold px-4 py-2 rounded-xl transition-all duration-200 ease-in-out w-full shadow-sm"
        onClick={() => onDetails(restaurant.id)}
      >
        View Details
      </button>
    </div>
  );
};

export default RestaurantCard;