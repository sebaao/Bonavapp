'use client';

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  distance: number;
  onDistanceChange: (value: number) => void;
  selectedCity: string;
  cities: string[];
  onCityChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedDiets: string[];
  onDietChange: (diet: string) => void;
  selectedRestrictions: string[];
  onRestrictionChange: (restriction: string) => void;
  selectedReligious: string[];
  onReligiousChange: (religious: string) => void;
}

const DIETS = [
  { value: "Vegan", label: "🌱 Vegan" },
  { value: "Vegetarian", label: "🥦 Vegetarian" },
  { value: "Keto", label: "🥚 Keto" },
  { value: "Paleo", label: "🍖 Paleo" },
  { value: "Mediterranean", label: "🥗 Mediterranean" },
  { value: "Raw", label: "🥒 Raw" },
];
const RESTRICTIONS = [
  { value: "Gluten-Free", label: "🌾 Gluten-Free" },
  { value: "Dairy-Free", label: "🥛 Dairy-Free" },
  { value: "Nut-Free", label: "🥜 Nut-Free" },
  { value: "Sugar-Free", label: "🍬 Sugar-Free" },
  { value: "Low-Sodium", label: "🧂⬇️ Low-Sodium" },
  { value: "Seafood Allergy", label: "🦐 Seafood Allergy" },
  { value: "Egg Allergy", label: "🥚 Egg Allergy" },
  { value: "Celiac", label: "🌾 Celiac" },
  { value: "Diabetic", label: "🩸 Diabetic" },
];
const RELIGIOUS = [
  { value: "Halal", label: "🕌 Halal" },
  { value: "Kosher", label: "✡️ Kosher" },
  { value: "Budista", label: "☸️ Budista" },
  { value: "Hindu", label: "🕉️ Hindu" },
];

const Filters: React.FC<FiltersProps> = ({
  search,
  onSearchChange,
  distance,
  onDistanceChange,
  selectedCity,
  cities,
  onCityChange,
  selectedLanguage,
  onLanguageChange,
  selectedDiets,
  onDietChange,
  selectedRestrictions,
  onRestrictionChange,
  selectedReligious,
  onReligiousChange,
}) => {
  const [openSection, setOpenSection] = useState<string | null>("search");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isSectionOpen = (section: string) => openSection === section;

  return (
    <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-[var(--secondary)] flex flex-col gap-3 sm:gap-4">
      {/* Buscador */}
      <div className="border-b border-[var(--secondary)] pb-4">
        <button
          onClick={() => toggleSection("search")}
          className="w-full flex items-center justify-between text-[var(--accent)] font-semibold mb-2 hover:text-[var(--primary)] transition-colors"
        >
          <span>Search restaurants</span>
          {isSectionOpen("search") ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        {isSectionOpen("search") && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search by name or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] bg-white text-gray-800 placeholder:text-gray-400"
              value={search}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Ciudad */}
      <div className="border-b border-[var(--secondary)] pb-4">
        <button
          onClick={() => toggleSection("city")}
          className="w-full flex items-center justify-between text-[var(--accent)] font-semibold mb-2 hover:text-[var(--primary)] transition-colors"
        >
          <span>City</span>
          {isSectionOpen("city") ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        {isSectionOpen("city") && (
          <div className="mt-3">
            <select
              className="w-full bg-white px-3 py-2 rounded-lg border border-gray-300 text-gray-800 font-medium outline-none"
              value={selectedCity}
              onChange={e => onCityChange(e.target.value)}
            >
              <option value="All Cities">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Distancia */}
      <div className="border-b border-[var(--secondary)] pb-4">
        <button
          onClick={() => toggleSection("distance")}
          className="w-full flex items-center justify-between text-[var(--accent)] font-semibold mb-2 hover:text-[var(--primary)] transition-colors"
        >
          <span>Distance from my location</span>
          {isSectionOpen("distance") ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        {isSectionOpen("distance") && (
          <div className="mt-3">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={50}
                value={distance}
                onChange={e => onDistanceChange(Number(e.target.value))}
                className="accent-[#2ECC71] w-full"
              />
              <span className="text-[var(--accent)] font-bold min-w-[40px]">{distance} km</span>
            </div>
          </div>
        )}
      </div>

      {/* Dietas principales */}
      <div className="border-b border-[var(--secondary)] pb-4">
        <button
          onClick={() => toggleSection("diets")}
          className="w-full flex items-center justify-between text-[var(--accent)] font-semibold mb-2 hover:text-[var(--primary)] transition-colors"
        >
          <span>Main Diets</span>
          {isSectionOpen("diets") ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        {isSectionOpen("diets") && (
          <div className="mt-3">
            <div className="flex flex-col gap-2">
              {DIETS.map(diet => (
                <label key={diet.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDiets.includes(diet.value)}
                    onChange={() => onDietChange(diet.value)}
                    className="accent-[#2ECC71] rounded"
                  />
                  <span className="text-gray-800">{diet.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Restricciones alimentarias */}
      <div className="border-b border-[var(--secondary)] pb-4">
        <button
          onClick={() => toggleSection("restrictions")}
          className="w-full flex items-center justify-between text-[var(--accent)] font-semibold mb-2 hover:text-[var(--primary)] transition-colors"
        >
          <span>Dietary Restrictions</span>
          {isSectionOpen("restrictions") ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        {isSectionOpen("restrictions") && (
          <div className="mt-3">
            <div className="flex flex-col gap-2">
              {RESTRICTIONS.map(restriction => (
                <label key={restriction.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRestrictions.includes(restriction.value)}
                    onChange={() => onRestrictionChange(restriction.value)}
                    className="accent-[#714DBF] rounded"
                  />
                  <span className="text-gray-800">{restriction.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Restricciones religiosas */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection("religious")}
          className="w-full flex items-center justify-between text-[var(--accent)] font-semibold mb-2 hover:text-[var(--primary)] transition-colors"
        >
          <span>Religious Restrictions</span>
          {isSectionOpen("religious") ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
        {isSectionOpen("religious") && (
          <div className="mt-3">
            <div className="flex flex-col gap-2">
              {RELIGIOUS.map(religious => (
                <label key={religious.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedReligious.includes(religious.value)}
                    onChange={() => onReligiousChange(religious.value)}
                    className="accent-[#50E3C2] rounded"
                  />
                  <span className="text-gray-800">{religious.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Filters;