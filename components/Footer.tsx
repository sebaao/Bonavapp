'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--background)] border-t border-green-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <div className="bg-green-600 rounded-lg p-2">
              <Image 
                src="/images/logo.png" 
                alt="Logo Bona Vita" 
                width={32} 
                height={32} 
                className="rounded"
              />
            </div>
            <span className="text-xl font-bold text-[var(--accent)] tracking-tight">
              BonaV
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <Link href="/admin" className="text-gray-600 text-sm hover:text-[var(--accent)] transition-colors cursor-pointer">
              © 2025 Created by Sebastián A. López
            </Link>
            <p className="text-gray-500 text-xs mt-1">
              Choose Safe in Seconds
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 