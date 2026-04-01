import { Navbar } from '@/components/navbar';
import { SAMPLE_VIDEOS } from '@/lib/videos';
import { Heart, Share2, Eye, User } from 'lucide-react';

export const metadata = {
  title: 'Video - BITStream',
  description: 'Watch video content on BITStream',
};

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = SAMPLE_VIDEOS.find((v) => v.id === params.id) || SAMPLE_VIDEOS[0];

  const relatedVideos = SAMPLE_VIDEOS.filter((v) => v.category === video.category && v.id !== video.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="w-full aspect-video rounded-lg bg-black border border-border overflow-hidden mb-6">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{video.title}</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {video.uploadedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{(video.views / 1000).toFixed(0)}K views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{(video.likes / 1000).toFixed(1)}K likes</span>
                </div>
                <button className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-card transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Channel Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
                    <User className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{video.uploadedBy}</h3>
                    <p className="text-sm text-muted-foreground">{video.uploads} videos</p>
                  </div>
                </div>
                <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>

              {/* Description */}
              <div className="py-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">About</h3>
                <p className="text-muted-foreground leading-relaxed">{video.description}</p>
              </div>

              {/* Comments Section */}
              <div className="py-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-6">Comments (12)</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-card border border-border flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">User Name</span>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="text-muted-foreground text-sm">Great content! Really enjoyed this video.</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-primary">Like</button>
                        <button className="text-xs text-muted-foreground hover:text-primary">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((v) => (
                <a key={v.id} href={`/video/${v.id}`} className="group">
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-card border border-border mb-2 group-hover:border-primary/50 transition-colors">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {v.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{(v.views / 1000).toFixed(0)}K views</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 BITStream. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
