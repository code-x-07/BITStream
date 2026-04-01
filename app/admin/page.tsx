import { Navbar } from '@/components/navbar';
import { Plus, Edit2, Trash2, Upload } from 'lucide-react';

export const metadata = {
  title: 'Upload Videos - BITStream',
  description: 'Upload and manage your videos on BITStream',
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Upload Video</h1>
            <p className="text-muted-foreground">Share your video with our community</p>
          </div>

          {/* Upload Form */}
          <div className="border border-border rounded-xl p-8 bg-card/50 backdrop-blur-sm mb-8">
            <form className="space-y-6">
              {/* Video Upload Area */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">Video File</label>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-medium mb-1">Drop your video here</p>
                  <p className="text-sm text-muted-foreground">or click to browse (Max 1GB)</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports MP4, WebM, AVI</p>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">Thumbnail</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <p className="text-foreground font-medium mb-1">Upload custom thumbnail</p>
                  <p className="text-sm text-muted-foreground">or leave blank for auto-generated</p>
                </div>
              </div>

              {/* Video Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Video Title</label>
                  <input
                    type="text"
                    placeholder="Enter an engaging title"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors">
                    <option>Movies</option>
                    <option>Series</option>
                    <option>Campus Stories</option>
                    <option>Vlogs</option>
                    <option>Educational</option>
                    <option>Comedy</option>
                    <option>Music</option>
                    <option>Tutorials</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  placeholder="Describe your video content..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Upload Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Video
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
            <h3 className="font-semibold text-foreground mb-3">Tips for better videos:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use clear, descriptive titles that accurately represent your content</li>
              <li>• Write detailed descriptions with relevant tags and keywords</li>
              <li>• Upload a high-quality thumbnail (1280x720px recommended)</li>
              <li>• Ensure good video quality - minimum 720p recommended</li>
              <li>• Keep videos between 2 minutes and 2 hours for best engagement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 BITStream. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
