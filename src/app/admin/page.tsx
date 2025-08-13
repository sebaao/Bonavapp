'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Save, X, CheckCircle, Eye, Search, Filter } from 'lucide-react';
import Link from 'next/link';
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
  menu: any[];
  reviews: string[];
  verified?: boolean;
  createdAt?: string;
}

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants');
      const data = await response.json();
      // Agregar campos por defecto si no existen
      const restaurantsWithDefaults = data.map((restaurant: Restaurant) => ({
        ...restaurant,
        verified: restaurant.verified ?? false,
        createdAt: restaurant.createdAt ?? new Date().toISOString()
      }));
      setRestaurants(restaurantsWithDefaults);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

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
        setRestaurants(prev => prev.map(r => 
          r.id === editingRestaurant.id ? editingRestaurant : r
        ));
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

  const handleChange = (field: keyof Restaurant, value: any) => {
    if (!editingRestaurant) return;
    setEditingRestaurant(prev => prev ? { ...prev, [field]: value } : null);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterVerified === 'all' || 
                         (filterVerified === 'verified' && restaurant.verified) ||
                         (filterVerified === 'unverified' && !restaurant.verified);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--primary)] mb-2 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Link>
              <h1 className="text-3xl font-bold text-[var(--accent)]">Admin Panel</h1>
              <p className="text-gray-600">Manage all registered restaurants</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-500">Total Restaurants</p>
              <p className="text-xl sm:text-2xl font-bold text-[var(--accent)]">{restaurants.length}</p>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterVerified}
                onChange={(e) => setFilterVerified(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              >
                <option value="all">All Restaurants</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Restaurants List */}
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm p-6">
              {editingId === restaurant.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--accent)]">Editing: {restaurant.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--primary)] text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editingRestaurant?.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingRestaurant?.category || ''}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editingRestaurant?.location || ''}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={editingRestaurant?.rating || 0}
                        onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price Level</label>
                      <select
                        value={editingRestaurant?.priceLevel || 1}
                        onChange={(e) => handleChange('priceLevel', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      >
                        <option value={1}>💲 Budget</option>
                        <option value={2}>💲💲 Moderate</option>
                        <option value={3}>💲💲💲 Expensive</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingRestaurant?.verified || false}
                          onChange={(e) => handleChange('verified', e.target.checked)}
                          className="w-4 h-4 text-[var(--accent)] focus:ring-[var(--accent)] border-gray-300 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Verified</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editingRestaurant?.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                        {restaurant.verified && (
                          <span className="bg-[var(--badge-green)] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          {restaurant.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{restaurant.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <p className="font-medium">{restaurant.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Rating:</span>
                          <p className="font-medium">⭐ {restaurant.rating}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <p className="font-medium">{'💲'.repeat(restaurant.priceLevel)}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <p className={`font-medium ${restaurant.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {restaurant.isOpen ? 'Open' : 'Closed'}
                          </p>
                        </div>
                      </div>
                      
                      {restaurant.createdAt && (
                        <p className="text-xs text-gray-400 mt-2">
                          Registered: {new Date(restaurant.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setShowDetails(showDetails === restaurant.id ? null : restaurant.id)}
                        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(restaurant)}
                        className="flex items-center gap-1 bg-[var(--accent)] hover:bg-[var(--primary)] text-white px-3 py-2 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                  </div>
                  
                  {/* Details Panel */}
                  {showDetails === restaurant.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Restaurant Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <p className="font-medium">{restaurant.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Website:</span>
                          <p className="font-medium">
                            {restaurant.website ? (
                              <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                                Visit website
                              </a>
                            ) : 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Hours:</span>
                          <p className="font-medium">{restaurant.hours || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Distance:</span>
                          <p className="font-medium">{restaurant.distance} km</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-gray-500">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {restaurant.tags.map((tag, index) => (
                              <span key={index} className="bg-[var(--badge-green)]/10 text-[var(--badge-green)] px-2 py-1 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-gray-500">Menu Items:</span>
                          <p className="font-medium">{restaurant.menu?.length || 0} sections</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-gray-500">Reviews:</span>
                          <p className="font-medium">{restaurant.reviews?.length || 0} reviews</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
} 