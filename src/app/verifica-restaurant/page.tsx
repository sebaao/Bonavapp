'use client';
import React, { useState } from 'react';
import { CheckCircle, Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Footer from '../../../components/Footer';

const initialState = {
  name: '',
  category: '',
  description: '',
  location: '',
  hours: '',
  isOpen: false,
  priceLevel: 1,
  rating: 0,
  tags: [] as string[],
  image: '',
  distance: 0,
  website: '',
  phone: '',
};

const TAGS = [
  'Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Mediterranean', 'Raw',
  'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Sugar-Free', 'Low-Sodium',
  'Seafood Allergy', 'Egg Allergy', 'Celiac', 'Diabetic',
  'Halal', 'Kosher', 'Budista', 'Hindu'
];

const CATEGORIES = [
  'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'French',
  'Indian', 'Japanese', 'Thai', 'Greek', 'Spanish', 'Brazilian',
  'Vegan Restaurant', 'Vegetarian Restaurant', 'Seafood', 'Steakhouse',
  'Fast Food', 'Fine Dining', 'Cafe', 'Bakery', 'Pizzeria', 'Sushi Bar'
];

export default function VerificaRestaurant() {
  const [form, setForm] = useState(initialState);
  const [menu, setMenu] = useState([{ title: '', items: [{ name: '', description: '', price: '' }] }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagChange = (tag: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  const handleMenuChange = (i: number, j: number, field: string, value: string) => {
    setMenu(prev => prev.map((section, idx) => idx === i ? {
      ...section,
      items: section.items.map((item, idx2) => idx2 === j ? { ...item, [field]: value } : item)
    } : section));
  };

  const handleMenuSectionChange = (i: number, value: string) => {
    setMenu(prev => prev.map((section, idx) => idx === i ? { ...section, title: value } : section));
  };

  const addMenuSection = () => setMenu(prev => [...prev, { title: '', items: [{ name: '', description: '', price: '' }] }]);
  
  const addMenuItem = (i: number) => setMenu(prev => prev.map((section, idx) => idx === i ? { ...section, items: [...section.items, { name: '', description: '', price: '' }] } : section));
  
  const removeMenuItem = (sectionIndex: number, itemIndex: number) => {
    setMenu(prev => prev.map((section, idx) => idx === sectionIndex ? {
      ...section,
      items: section.items.filter((_, itemIdx) => itemIdx !== itemIndex)
    } : section));
  };

  const removeMenuSection = (sectionIndex: number) => {
    setMenu(prev => prev.filter((_, idx) => idx !== sectionIndex));
  };

  const resetForm = () => {
    setForm(initialState);
    setMenu([{ title: '', items: [{ name: '', description: '', price: '' }] }]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validación básica
      if (!form.name || !form.category || !form.location) {
        setError('Please complete all required fields: Name, Category, and Location.');
        return;
      }

      // Filtrar menú vacío
      const filteredMenu = menu
        .filter(section => section.title.trim() && section.items.some(item => item.name.trim()))
        .map(section => ({
          ...section,
          items: section.items.filter(item => item.name.trim())
        }));

      const restaurantData = {
        ...form,
        menu: filteredMenu
      };

      const response = await fetch('/api/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Restaurant added successfully! It will appear in the main list shortly.');
        resetForm();
      } else {
        setError(result.error || 'Failed to add restaurant. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--primary)] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </Link>
          <h1 className="text-3xl font-bold text-[var(--accent)] mb-2">Verify Your Restaurant</h1>
          <p className="text-gray-600">Add your restaurant to our verified list and help customers find safe dining options.</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[var(--accent)] mb-3 sm:mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Restaurant Name *</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                    placeholder="Enter restaurant name"
                    required 
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Category *</label>
                  <select 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-2">Description</label>
                  <textarea 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                    rows={3}
                    placeholder="Describe your restaurant, specialties, and atmosphere"
                  />
                </div>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-[var(--accent)] mb-4">Location & Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Address *</label>
                  <input 
                    name="location" 
                    value={form.location} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                    placeholder="Full address"
                    required 
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Phone</label>
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Website</label>
                  <input 
                    name="website" 
                    value={form.website} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                    placeholder="https://your-website.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Hours</label>
                  <input 
                    name="hours" 
                    value={form.hours} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                    placeholder="e.g., 9:00 AM - 10:00 PM"
                  />
                </div>
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-[var(--accent)] mb-4">Restaurant Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Price Level</label>
                  <select 
                    name="priceLevel" 
                    value={form.priceLevel} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                  >
                    <option value={1}>💲 Budget</option>
                    <option value={2}>💲💲 Moderate</option>
                    <option value={3}>💲💲💲 Expensive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Rating</label>
                  <input 
                    name="rating" 
                    type="number" 
                    min={0} 
                    max={5} 
                    step={0.1} 
                    value={form.rating} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Distance (km)</label>
                  <input 
                    name="distance" 
                    type="number" 
                    min={0} 
                    value={form.distance} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isOpen" 
                    checked={form.isOpen} 
                    onChange={handleChange} 
                    className="w-4 h-4 text-[var(--accent)] focus:ring-[var(--accent)] border-gray-300 rounded"
                  />
                  <span className="font-semibold text-gray-700">Currently Open</span>
                </label>
              </div>
            </div>

            {/* Specialties & Features */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-[var(--accent)] mb-4">Specialties & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TAGS.map(tag => (
                  <label key={tag} className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={form.tags.includes(tag)} 
                      onChange={() => handleTagChange(tag)} 
                      className="w-4 h-4 text-[var(--accent)] focus:ring-[var(--accent)] border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-[var(--accent)] mb-4">Menu</h2>
              {menu.map((section, i) => (
                <div key={i} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      placeholder="Section title (e.g., Main Dishes)"
                      value={section.title}
                      onChange={e => handleMenuSectionChange(i, e.target.value)}
                      className="flex-1 border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-[var(--accent)] font-semibold"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeMenuSection(i)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <input 
                          placeholder="Item name" 
                          value={item.name} 
                          onChange={e => handleMenuChange(i, j, 'name', e.target.value)} 
                          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                        />
                        <input 
                          placeholder="Description" 
                          value={item.description} 
                          onChange={e => handleMenuChange(i, j, 'description', e.target.value)} 
                          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                        />
                        <input 
                          placeholder="Price" 
                          value={item.price} 
                          onChange={e => handleMenuChange(i, j, 'price', e.target.value)} 
                          className="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                        />
                        <button 
                          type="button" 
                          onClick={() => removeMenuItem(i, j)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => addMenuItem(i)}
                      className="text-[var(--accent)] hover:text-[var(--primary)] text-sm font-medium flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </button>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addMenuSection}
                className="text-[var(--accent)] hover:text-[var(--primary)] font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Menu Section
              </button>
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Restaurant Image (URL)</label>
              <input 
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent" 
                placeholder="https://example.com/restaurant-image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">Leave empty to use a default image</p>
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[var(--accent)] hover:bg-[var(--primary)] disabled:bg-gray-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </form>
                 </div>
       </div>
       <Footer />
     </div>
   );
}