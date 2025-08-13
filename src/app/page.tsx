'use client';
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Filters from "../../components/Filters";
import RestaurantCard from "../../components/RestaurantCard";
import RestaurantModal from "../../components/RestaurantModal";
import Footer from "../../components/Footer";
// import restaurantsData from "../../data/restaurants.json";

const getUniqueCities = (data: any[]) => {
  const cities = data.map(r => {
    const match = r.location.match(/,\s*(.+)$/);
    return match ? match[1] : "";
  });
  return Array.from(new Set(cities)).filter(Boolean).sort();
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [restaurantsData, setRestaurantsData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  // Cargar restaurantes desde la API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setDataLoading(true);
        const response = await fetch('/api/restaurants');
        const data = await response.json();
        console.log('Restaurants loaded:', data.length);
        console.log('Verified restaurants:', data.filter((r: any) => r.verified).length);
        setRestaurantsData(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchRestaurants();
  }, []);

  useEffect(() => {
    setZoom(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [distance, setDistance] = useState(50);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [selectedReligious, setSelectedReligious] = useState<string[]>([]);
  const [modalId, setModalId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, string[]>>({});

  const cities = useMemo(() => {
    const cityList = getUniqueCities(restaurantsData);
    console.log('Cities found:', cityList);
    return cityList;
  }, [restaurantsData]);
  
  React.useEffect(() => {
    if (!selectedCity && cities.length > 0) setSelectedCity("All Cities");
  }, [cities, selectedCity]);

  const filteredRestaurants = useMemo(() => {
    return restaurantsData.filter(r => {
      // Solo mostrar restaurantes verificados
      if (!r.verified) return false;
      
      // Filtro por ciudad
      const city = r.location.split(", ").pop();
      if (selectedCity && selectedCity !== "All Cities" && city !== selectedCity) return false;
      // Filtro por distancia
      if (Number(r.distance) > distance) return false;
      // Filtro por búsqueda
      const text = `${r.name} ${r.description}`.toLowerCase();
      if (search && !text.includes(search.toLowerCase())) return false;
      // Filtro por dietas
      if (selectedDiets.length && !selectedDiets.some(d => r.tags.includes(d))) return false;
      // Filtro por restricciones
      if (selectedRestrictions.length && !selectedRestrictions.some(d => r.tags.includes(d))) return false;
      // Filtro por religiosas
      if (selectedReligious.length && !selectedReligious.some(d => r.tags.includes(d))) return false;
      return true;
    });
  }, [search, distance, selectedCity, selectedDiets, selectedRestrictions, selectedReligious]);

  // Calcular estadísticas en tiempo real
  const verifiedRestaurants = useMemo(() => {
    return restaurantsData.filter(r => r.verified).length;
  }, [restaurantsData]);

  const totalRestaurants = restaurantsData.length;

  const handleDietChange = (diet: string) => {
    setSelectedDiets(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);
  };
  const handleRestrictionChange = (restriction: string) => {
    setSelectedRestrictions(prev => prev.includes(restriction) ? prev.filter(d => d !== restriction) : [...prev, restriction]);
  };
  const handleReligiousChange = (religious: string) => {
    setSelectedReligious(prev => prev.includes(religious) ? prev.filter(d => d !== religious) : [...prev, religious]);
  };
  const handleAddReview = (id: string, review: string) => {
    setReviews(prev => ({ ...prev, [id]: [...(prev[id] || []), review] }));
  };

  const modalRestaurant = modalId ? {
    ...filteredRestaurants.find(r => r.id === modalId),
    reviews: reviews[modalId] || []
  } : null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-green-600 z-50">
        <div className={`transition-all duration-1000 ease-in-out ${zoom ? 'opacity-100 scale-125' : 'opacity-0 scale-75'}`}>
          <div className=" ">
            <Image
              src="/images/logo.png"
              alt="Logo Bona Vita"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar
        restaurantCount={verifiedRestaurants}
        totalRestaurants={totalRestaurants}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        selectedCity={selectedCity}
        cities={cities}
        onCityChange={setSelectedCity}
      />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar de filtros */}
          <aside className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <Filters
                search={search}
                onSearchChange={setSearch}
                distance={distance}
                onDistanceChange={setDistance}
                selectedCity={selectedCity}
                cities={cities}
                onCityChange={setSelectedCity}
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                selectedDiets={selectedDiets}
                onDietChange={handleDietChange}
                selectedRestrictions={selectedRestrictions}
                onRestrictionChange={handleRestrictionChange}
                selectedReligious={selectedReligious}
                onReligiousChange={handleReligiousChange}
              />
            </div>
          </aside>
          
          {/* Contenido principal */}
          <main className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--foreground)]">
              Found {filteredRestaurants.length} Verified Restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredRestaurants.length === 0 && (
                <div className="col-span-full text-center text-gray-500">
                  No verified restaurants found with the selected filters.
                </div>
              )}
              {filteredRestaurants.map(r => (
                <RestaurantCard
                  key={r.id}
                  restaurant={{ ...r, reviews: reviews[r.id] || r.reviews }}
                  onDetails={setModalId}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
      <RestaurantModal
        restaurant={modalRestaurant}
        isOpen={!!modalId}
        onClose={() => setModalId(null)}
        onAddReview={review => modalId && handleAddReview(modalId, review)}
      />
      <Footer />
    </div>
  );
}
