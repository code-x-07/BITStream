'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import SearchFilter from '@/components/search-filter';
import VideoCarousel from '@/components/video-carousel';

// Sample video data
const sampleVideos = [
  {
    id: '1',
    title: 'Advanced Data Structures & Algorithms',
    thumbnail: '',
    duration: '1:23:45',
    professor: 'Prof. John Smith',
    progress: 65,
  },
  {
    id: '2',
    title: 'Web Development Fundamentals',
    thumbnail: '',
    duration: '2:15:30',
    professor: 'Prof. Sarah Johnson',
    progress: 30,
  },
  {
    id: '3',
    title: 'Machine Learning Basics',
    thumbnail: '',
    duration: '1:45:20',
    professor: 'Prof. Michael Chen',
  },
  {
    id: '4',
    title: 'Database Design Patterns',
    thumbnail: '',
    duration: '2:05:15',
    professor: 'Prof. Emma Davis',
    progress: 85,
  },
  {
    id: '5',
    title: 'Cloud Architecture with AWS',
    thumbnail: '',
    duration: '3:10:45',
    professor: 'Prof. Alex Wilson',
  },
  {
    id: '6',
    title: 'System Design Interview Prep',
    thumbnail: '',
    duration: '2:30:20',
    professor: 'Prof. Robert Martinez',
    progress: 45,
  },
];

export default function Home() {
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    branch: '',
    course: '',
    professor: '',
    type: '',
  });

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <SearchFilter onFilterChange={setFilters} />

      {/* Featured Videos */}
      <VideoCarousel title="Featured This Week" videos={sampleVideos} />

      {/* Recent Videos */}
      <VideoCarousel title="Recently Added" videos={sampleVideos.reverse()} />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-foreground/60">
            BITStream © 2024. All rights reserved. Educational Platform for Students.
          </p>
        </div>
      </footer>
    </main>
  );
}
