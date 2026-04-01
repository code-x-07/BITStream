import { Navbar } from '@/components/navbar';
import { VideoCard } from '@/components/video-card';
import { SAMPLE_VIDEOS, CATEGORIES } from '@/lib/videos';
import { Upload, Play } from 'lucide-react';

export const metadata = {
  title: 'BITStream - Video Sharing Community',
  description: 'Share and discover videos: movies, series, campus stories, vlogs, music, tutorials, and more.',
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Share Your <span className="text-primary">Stories</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Upload videos from movies and series to campus stories, vlogs, and more. Share with our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/admin" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  <Upload className="w-5 h-5" />
                  Upload Video
                </a>
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-card transition-colors">
                  <Play className="w-5 h-5" />
                  Browse Videos
                </button>
              </div>
            </div>
            
            <div className="flex-1 hidden md:block">
              <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Play className="w-20 h-20 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-border hover:border-primary text-sm font-medium transition-colors whitespace-nowrap hover:bg-primary/10"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Latest Videos</h2>
            <p className="text-muted-foreground mt-2">Discover amazing content from our community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_VIDEOS.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">BITStream</h3>
              <p className="text-muted-foreground text-sm">A video sharing community for all kinds of content.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Discover</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/" className="hover:text-primary transition-colors">Videos</a></li>
                <li><a href="/admin" className="hover:text-primary transition-colors">Upload</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 BITStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
