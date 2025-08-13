'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronDown, MapPin, Globe, Menu, X } from "lucide-react";

interface NavbarProps {
  restaurantCount: number;
  totalRestaurants: number;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  selectedCity: string;
  cities: string[];
  onCityChange: (city: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  restaurantCount,
  totalRestaurants,
  selectedLanguage,
  onLanguageChange,
  selectedCity,
  cities,
  onCityChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const verifiedRestaurants = restaurantCount;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Navbar principal */}
      <div className="flex items-center justify-between px-4 py-3 md:px-11 md:py-4">
        {/* Logo y nombre - centrados en móvil, izquierda en desktop */}
        <div className="flex items-center md:flex-none">
          <Link href="/home">
            <div className="bg-green-600 rounded-lg p-2 mr-3">
              <Image 
                src="/images/logo.png" 
                alt="Logo Bona Vita" 
                width={44} 
                height={44} 
                className="rounded"
              />
            </div>
          </Link>
          <Link href="/home">
            <span className="text-xl md:text-2xl font-bold text-[var(--accent)] tracking-tight">
              BonaV
            </span>
          </Link>
        </div>

        {/* Pin con ciudad seleccionada - oculto en móvil, visible en desktop */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
          <MapPin className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {selectedCity}
          </span>
        </div>

        {/* Botón hamburguesa - solo visible en móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Elementos de la esquina superior derecha - solo visible en desktop */}
        <div className="hidden md:flex items-center gap-3 md:gap-4">
          {/* Selector de idiomas con icono de globo y flecha */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-12 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200 cursor-pointer"
              value={selectedLanguage}
              onChange={e => onLanguageChange(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="es">PT </option>
              <option value="es">IT</option>
              <option value="es">CH</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Globe className="w-4 h-4 text-gray-500 mr-2" />
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
          </div>



          {/* Botón de verificación */}
          <Link href="/verifica-restaurant">
            <button className="flex items-center gap-2 bg-[var(--badge-green)] hover:bg-[var(--primary)] text-white font-bold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm text-sm">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Verify my restaurant</span>
              <span className="sm:hidden">Verify</span>
            </button>
          </Link>

          {/* Botón de Login/Sign Up */}
          <Link href="/user">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              Login / Sign Up
            </button>
          </Link>

          {/* Contador de restaurantes */}
          <div className="bg-orange-700 text-white px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden md:inline">
              {verifiedRestaurants} verified / {totalRestaurants} registered
            </span>
            <span className="md:hidden">
              {verifiedRestaurants}/{totalRestaurants}
            </span>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Pin con ciudad seleccionada */}
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-full border border-gray-200">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {selectedCity}
              </span>
            </div>

            {/* Selector de idiomas */}
            <div className="relative">
              <select
                className="w-full appearance-none bg-white border border-gray-300 px-4 py-3 pr-12 rounded-lg text-sm font-medium text-gray-700 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all duration-200 cursor-pointer"
                value={selectedLanguage}
                onChange={e => onLanguageChange(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="es">PT </option>
                <option value="es">IT</option>
                <option value="es">CH</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Globe className="w-4 h-4 text-gray-500 mr-2" />
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </div>
            </div>

      

            {/* Botón de verificación */}
            <Link href="/verifica-restaurant" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full flex items-center justify-center gap-2 bg-[var(--badge-green)] hover:bg-[var(--primary)] text-white font-bold px-4 py-3 rounded-xl transition-all duration-200 shadow-sm text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Verify my restaurant</span>
              </button>
            </Link>

            {/* Botón de Login/Sign Up */}
            <Link href="/user" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors text-sm">
                Login / Sign Up
              </button>
            </Link>

            {/* Contador de restaurantes */}
            <div className="bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>
                {verifiedRestaurants} verified / {totalRestaurants} registered
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;