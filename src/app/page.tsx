'use client';
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Users, Star, CheckCircle, TrendingUp } from "lucide-react";
import Navbar from "../../components/Navbar";
import Filters from "../../components/Filters";
import RestaurantCard from "../../components/RestaurantCard";
import RestaurantModal from "../../components/RestaurantModal";
import Footer from "../../components/Footer";
// import restaurantsData from "../../data/restaurants.json";

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

const getUniqueCities = (data: Restaurant[]) => {
  const cities = data.map(r => {
    const match = r.location.match(/,\s*(.+)$/);
    return match ? match[1] : "";
  });
  return Array.from(new Set(cities)).filter(Boolean).sort();
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  // Cargar restaurantes desde la API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setDataLoading(true);
        const response = await fetch('/api/restaurants-online');
        if (response.ok) {
          const data = await response.json();
          setRestaurantsData(data);
        } else {
          console.error('Error fetching restaurants');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    setZoom(true);
    const timer = setTimeout(() => {
      setLoading(false);
      // Pequeño delay para que la transición sea más suave
      setTimeout(() => setSplashVisible(false), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [search, setSearch] = useState("");
  const [distance, setDistance] = useState(50);
  const [selectedCity, setSelectedCity] = useState("All Cities");
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
  }, [restaurantsData, search, distance, selectedCity, selectedDiets, selectedRestrictions, selectedReligious]);

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

  const modalRestaurant = modalId ? (() => {
    const found = filteredRestaurants.find(r => r.id === modalId);
    return found ? {
      ...found,
      reviews: reviews[modalId] || found.reviews || []
    } : null;
  })() : null;

  if (splashVisible) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center bg-green-600 z-50 transition-all duration-1000 ease-in-out ${loading ? 'opacity-100' : 'opacity-0'}`}>
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
    <div className={`min-h-screen bg-[var(--background)] transition-all duration-1000 ease-in-out ${!splashVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                 {/* Stats Cards */}
         <div className="mb-8">
           {/* Desktop Grid */}
           <div className="hidden md:grid md:grid-cols-4 gap-4">
             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Verified Restaurants</p>
                   <p className="text-2xl font-bold text-gray-900">{verifiedRestaurants}</p>
                 </div>
                 <div className="p-3 bg-green-100 rounded-lg">
                   <CheckCircle className="w-6 h-6 text-green-600" />
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Total Restaurants</p>
                   <p className="text-2xl font-bold text-gray-900">{totalRestaurants}</p>
                 </div>
                 <div className="p-3 bg-blue-100 rounded-lg">
                   <TrendingUp className="w-6 h-6 text-blue-600" />
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                   <p className="text-2xl font-bold text-gray-900">
                     {restaurantsData.length > 0 
                       ? (restaurantsData.reduce((acc, r) => acc + (r.rating || 0), 0) / restaurantsData.length).toFixed(1)
                       : '0.0'
                     }
                   </p>
                 </div>
                 <div className="p-3 bg-yellow-100 rounded-lg">
                   <Star className="w-6 h-6 text-yellow-600" />
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                   <p className="text-2xl font-bold text-gray-900">
                     {restaurantsData.reduce((acc, r) => acc + (r.reviews?.length || 0), 0)}
                   </p>
                 </div>
                 <div className="p-3 bg-purple-100 rounded-lg">
                   <Users className="w-6 h-6 text-purple-600" />
                 </div>
               </div>
             </div>
           </div>

           {/* Mobile Carousel */}
           <div className="md:hidden">
             <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4">
               <div className="flex-shrink-0 w-full max-w-sm snap-center">
                 <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-gray-600">Verified Restaurants</p>
                       <p className="text-2xl font-bold text-gray-900">{verifiedRestaurants}</p>
                     </div>
                     <div className="p-3 bg-green-100 rounded-lg">
                       <CheckCircle className="w-6 h-6 text-green-600" />
                     </div>
                   </div>
                 </div>
               </div>

               <div className="flex-shrink-0 w-full max-w-sm snap-center">
                 <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-gray-600">Total Restaurants</p>
                       <p className="text-2xl font-bold text-gray-900">{totalRestaurants}</p>
                     </div>
                     <div className="p-3 bg-blue-100 rounded-lg">
                       <TrendingUp className="w-6 h-6 text-blue-600" />
                     </div>
                   </div>
                 </div>
               </div>

               <div className="flex-shrink-0 w-full max-w-sm snap-center">
                 <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                       <p className="text-2xl font-bold text-gray-900">
                         {restaurantsData.length > 0 
                           ? (restaurantsData.reduce((acc, r) => acc + (r.rating || 0), 0) / restaurantsData.length).toFixed(1)
                           : '0.0'
                         }
                       </p>
                     </div>
                     <div className="p-3 bg-yellow-100 rounded-lg">
                       <Star className="w-6 h-6 text-yellow-600" />
                     </div>
                   </div>
                 </div>
               </div>

               <div className="flex-shrink-0 w-full max-w-sm snap-center">
                 <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                       <p className="text-2xl font-bold text-gray-900">
                         {restaurantsData.reduce((acc, r) => acc + (r.reviews?.length || 0), 0)}
                       </p>
                     </div>
                     <div className="p-3 bg-purple-100 rounded-lg">
                       <Users className="w-6 h-6 text-purple-600" />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Header con mensaje principal */}
         <div className="mb-6">
           <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm p-4 border border-green-100">
             <div className="flex items-center justify-between">
               <div>
                 <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                   Your health, your food, your choice
                 </h2>
                 <p className="text-sm text-gray-600">
                   Found {filteredRestaurants.length} Verified Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} for your preferences.
                 </p>
               </div>
               <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                 <span className="text-green-600 text-xl">🌱</span>
               </div>
             </div>
           </div>
         </div>

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
