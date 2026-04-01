import { Navbar } from '@/components/navbar';
import { VideoCard } from '@/components/video-card';
import { SAMPLE_VIDEOS, CATEGORIES } from '@/lib/videos';
import { Upload, Play } from 'lucide-react';

export const metadata = {
  title: 'BITStream - Watch Videos Online',
  description: 'Share and discover videos: movies, series, campus stories, vlogs, music, tutorials, and more.',
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export default function Home() {
  const featuredVideo = SAMPLE_VIDEOS[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Netflix Style */}
      <section className="relative w-full h-screen -mt-16 flex items-end overflow-hidden">
        {/* Background Image/Gradient with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,14,39,0.8)_100%)] z-10" />
        
        {/* Featured video background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-purple-900/30 to-background" />

        {/* Content */}
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/30 border border-primary/50 text-primary text-sm font-semibold">
                Now Trending
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground mb-4 leading-tight">
              {featuredVideo.title}
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl line-clamp-3">
              {featuredVideo.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a 
                href={`/video/${featuredVideo.id}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-md bg-white text-black font-bold text-lg hover:bg-gray-300 transition-colors hover:scale-105 transform duration-200"
              >
                <Play className="w-6 h-6 fill-current" />
                Play
              </a>
              <a 
                href="/admin"
                className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-md bg-gray-600/50 text-white font-bold text-lg hover:bg-gray-600/80 transition-colors backdrop-blur-sm"
              >
                <Upload className="w-5 h-5" />
                Upload
              </a>
            </div>

            <div className="mt-8 flex gap-6 text-sm">
              <span className="text-gray-300">{featuredVideo.views?.toLocaleString()} views</span>
              <span className="text-gray-300">{featuredVideo.likes?.toLocaleString()} likes</span>
              <span className="text-gray-300">{featuredVideo.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-30 py-6 px-4 sm:px-6 lg:px-8 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase text-gray-500 font-bold tracking-widest mb-4">Browse Categories</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className="px-5 py-2 rounded-full border border-gray-600 text-sm font-medium text-foreground whitespace-nowrap hover:border-primary hover:bg-primary/20 transition-all duration-200 hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="relative z-20 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Latest Releases</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SAMPLE_VIDEOS.map((video) => (
              <div key={video.id} className="group">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
                  <span className="text-white font-black text-xs">B</span>
                </div>
                <h3 className="font-black text-foreground">BITStream</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">The ultimate video sharing platform for movies, series, campus stories, and more.</p>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-4 text-sm uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Browse</a></li>
                <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors">Upload</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">&copy; 2024 BITStream. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
