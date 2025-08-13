'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Edit, Save, X, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Footer from '../../../components/Footer';

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

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      const data = await response.json();
      // Asegurar que todos los restaurantes tengan las propiedades requeridas
      const processedData = data.map((restaurant: Restaurant) => ({
        ...restaurant,
        verified: restaurant.verified ?? false,
        createdAt: restaurant.createdAt ?? new Date().toISOString()
      }));
      setRestaurants(processedData);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleEdit = (restaurant: Restaurant) => {
    setEditingId(restaurant.id);
    setEditingRestaurant({ ...restaurant });
  };

  const handleSave = async () => {
    if (!editingRestaurant) return;

    try {
      const response = await fetch(`/api/restaurants/${editingRestaurant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingRestaurant),
      });

      if (response.ok) {
        await fetchRestaurants();
        setEditingId(null);
        setEditingRestaurant(null);
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingRestaurant(null);
  };

  const handleChange = (field: keyof Restaurant, value: string | boolean | number | string[]) => {
    if (editingRestaurant) {
      setEditingRestaurant({
        ...editingRestaurant,
        [field]: value,
      });
    }
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterVerified === 'all' ||
                           (filterVerified === 'verified' && restaurant.verified) ||
                           (filterVerified === 'unverified' && !restaurant.verified);
      
      return matchesSearch && matchesFilter;
    });
  }, [restaurants, searchTerm, filterVerified]);

  if (loading) {
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage all registered restaurants</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <p className="text-lg font-semibold text-[var(--accent)]">
                Total: {restaurants.length} restaurants
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value as 'all' | 'verified' | 'unverified')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
            >
              <option value="all">All Restaurants</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No restaurants found matching your criteria.</p>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-sm border">
                {editingId === restaurant.id ? (
                  // Edit Mode
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={editingRestaurant?.name || ''}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                          type="text"
                          value={editingRestaurant?.category || ''}
                          onChange={(e) => handleChange('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={editingRestaurant?.location || ''}
                          onChange={(e) => handleChange('location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={editingRestaurant?.rating || 0}
                          onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Level</label>
                        <select
                          value={editingRestaurant?.priceLevel || 1}
                          onChange={(e) => handleChange('priceLevel', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                        >
                          <option value={1}>$ (Low)</option>
                          <option value={2}>$$ (Medium)</option>
                          <option value={3}>$$$ (High)</option>
                          <option value={4}>$$$$ (Very High)</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editingRestaurant?.verified || false}
                            onChange={(e) => handleChange('verified', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">Verified</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingRestaurant?.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[var(--foreground)]">{restaurant.name}</h3>
                          {restaurant.verified && (
                            <span className="flex items-center gap-1 bg-[var(--badge-green)] text-white px-2 py-1 rounded-full text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-[var(--accent)] font-medium mb-1">{restaurant.category}</p>
                        <p className="text-gray-600 text-sm mb-2">{restaurant.location}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⭐ {restaurant.rating}</span>
                          <span>{"💲".repeat(restaurant.priceLevel)}</span>
                          <span>{restaurant.distance} km</span>
                          <span className={restaurant.isOpen ? 'text-green-600' : 'text-red-600'}>
                            {restaurant.isOpen ? 'Open' : 'Closed'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Registered: {new Date(restaurant.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowDetails(prev => ({ ...prev, [restaurant.id]: !prev[restaurant.id] }))}
                          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors"
                        >
                          {showDetails[restaurant.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          Details
                        </button>
                        <button
                          onClick={() => handleEdit(restaurant)}
                          className="flex items-center gap-1 bg-[var(--accent)] hover:bg-[var(--primary)] text-white px-3 py-1 rounded-lg text-sm transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Details Panel */}
                    {showDetails[restaurant.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Phone:</strong> {restaurant.phone}</p>
                            <p><strong>Website:</strong> {restaurant.website ? (
                              <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {restaurant.website}
                              </a>
                            ) : 'N/A'}</p>
                            <p><strong>Hours:</strong> {restaurant.hours}</p>
                            <p><strong>Distance:</strong> {restaurant.distance} km</p>
                          </div>
                          <div>
                            <p><strong>Tags:</strong> {restaurant.tags.join(', ')}</p>
                            <p><strong>Menu Items:</strong> {restaurant.menu.reduce((acc, section) => acc + section.items.length, 0)}</p>
                            <p><strong>Reviews:</strong> {restaurant.reviews.length}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-700">{restaurant.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
} 