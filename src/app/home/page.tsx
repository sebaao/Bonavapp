'use client';
import React from "react";
import Link from "next/link";
import { 
  Shield, 
  MapPin, 
  Search, 
  Users, 
  Clock, 
  Star, 
  ArrowRight, 
  Mail,
  CheckCircle,
  Quote
} from "lucide-react";
import Footer from "../../../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Your food,</span>
                <br />
                <span className="text-green-600">your health,</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  your choice
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg">
                Find food safely near you from certified restaurants without worrying about contamination or health concerns.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Certified Restaurants</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Location-Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Search className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-600 font-medium">Smart Filtering</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/">
                <button className="bg-gradient-to-r from-green-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Searching
                </button>
              </Link>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1000+</div>
                  <div className="text-gray-600 text-sm">Certified Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50k+</div>
                  <div className="text-gray-600 text-sm">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-gray-600 text-sm">Safety Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-blue-100 p-8">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="bg-green-600 rounded-full p-6 mx-auto mb-4 w-20 h-20 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Safe Dining Experience</h3>
                    <p className="text-gray-600">Find certified restaurants near you</p>
                  </div>
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white p-3 rounded-full shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-purple-600 text-white p-3 rounded-full shadow-lg">
                    <Search className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-gray-900">What makes us</span>
              <span className="text-green-600"> different?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand that finding safe food isn't just about preferences - it's about your health and peace of mind.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Map and Search */}
              <div className="text-center">
                <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    15
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Location</h3>
                <p className="text-gray-600 text-sm">Find restaurants near you with real-time distance calculations</p>
              </div>

              {/* Shield and Verification */}
              <div className="text-center">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Shield className="w-8 h-8 text-green-600" />
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <CheckCircle className="w-4 h-4 text-red-500" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Verified Safety</h3>
                <p className="text-gray-600 text-sm">All restaurants are certified and regularly inspected</p>
              </div>

              {/* People and Food */}
              <div className="text-center">
                <div className="bg-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    13
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                <p className="text-gray-600 text-sm">Real reviews from people with similar dietary needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find relevant food places quickly</h3>
              <p className="text-gray-600 text-sm">Advanced filtering system that understands your specific dietary needs and preferences.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Caters to all dietary needs</h3>
              <p className="text-gray-600 text-sm">From gluten-free to vegan, halal to kosher - we ensure every dietary restriction is covered.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Offers multiple food options</h3>
              <p className="text-gray-600 text-sm">Discover diverse cuisines and meal options that align with your health requirements.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location-based recommendations</h3>
              <p className="text-gray-600 text-sm">Find certified restaurants near you with real-time availability and distance information.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time updates</h3>
              <p className="text-gray-600 text-sm">Get instant notifications about menu changes, new certifications, and special offers.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified reviews</h3>
              <p className="text-gray-600 text-sm">Read authentic reviews from people with similar dietary restrictions to make informed choices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What our <span className="text-purple-600">users</span> say
            </h2>
            <p className="text-gray-600">
              Real stories from people who've found food freedom with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-green-400" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;This is exactly what I needed when looking for vegan options during lunch breaks! No more worrying about cross-contamination.&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Sarah M.</p>
                  <p className="text-sm text-gray-600">Vegan Professional</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Vegan
                </span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-green-400" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;I can find halal food options easily now. The certification verification gives me complete peace of mind.&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Ahmed K.</p>
                  <p className="text-sm text-gray-600">Halal Food Enthusiast</p>
                </div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Halal
                </span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-green-400" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;Finally, a platform that truly understands gluten-free needs. The detailed allergen information is a lifesaver!&quot;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Emma L.</p>
                  <p className="text-sm text-gray-600">Celiac Patient</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Gluten-Free
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 font-medium mb-4">
              Trusted by food-conscious individuals worldwide
            </p>
            <div className="flex justify-center items-center space-x-8 text-gray-600">
              <span>4.9/5 Rating</span>
              <div className="w-px h-6 bg-gray-300"></div>
              <span>50,000+ Users</span>
              <div className="w-px h-6 bg-gray-300"></div>
              <span>1,000+ Restaurants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to eat with <span className="text-yellow-400">confidence?</span>
              </h2>
              <p className="text-white/90 text-lg">
                Join thousands of people who&apos;ve found food freedom. Start your journey to safe, delicious dining today.
              </p>

              {/* Email Input */}
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Notify Me
                </button>
              </div>
              <p className="text-white/80 text-sm">
                Be the first to know when we launch in your area.
              </p>

              {/* Start Searching Button */}
              <Link href="/">
                <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                  Start Searching
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>

              {/* Features List */}
              <div className="space-y-2">
                {["Real-time updates", "Multi-language", "Offline access", "Free to use"].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - App Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl relative">
                <div className="absolute top-4 right-4 bg-yellow-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
                <div className="bg-blue-900 rounded-xl p-6 text-center">
                  <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="w-6 h-6 bg-green-400 rounded"></div>
                    <div className="w-6 h-6 bg-blue-400 rounded"></div>
                    <div className="w-6 h-6 bg-purple-400 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-600 rounded"></div>
                    <div className="h-2 bg-gray-600 rounded w-3/4 mx-auto"></div>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">iOS & Android</p>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 bg-blue-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="absolute top-1/2 -left-4 bg-green-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="absolute -top-4 -right-4 bg-purple-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div className="absolute top-1/2 -right-4 bg-orange-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-orange-600 rounded"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-purple-100 p-3 rounded-full">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage; 