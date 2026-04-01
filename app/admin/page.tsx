'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import UploadForm from '@/components/upload-form';
import { Trash2, Edit2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadedVideo {
  id: string;
  title: string;
  professor: string;
  course: string;
  uploadedAt: string;
  views: number;
}

export default function AdminPage() {
  const [videos, setVideos] = useState<UploadedVideo[]>([
    {
      id: '1',
      title: 'Advanced Data Structures',
      professor: 'Prof. John Smith',
      course: 'CSE 301',
      uploadedAt: '2024-03-15',
      views: 245,
    },
    {
      id: '2',
      title: 'Web Development Fundamentals',
      professor: 'Prof. Sarah Johnson',
      course: 'CSE 201',
      uploadedAt: '2024-03-10',
      views: 189,
    },
    {
      id: '3',
      title: 'Machine Learning Basics',
      professor: 'Prof. Michael Chen',
      course: 'CSE 401',
      uploadedAt: '2024-03-05',
      views: 312,
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleVideoUpload = () => {
    // Reload videos or add new video to list
    setShowUploadForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter((v) => v.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-foreground/70">Manage and upload educational content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="glass-dark p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-4">Upload New Video</h2>
              {showUploadForm ? (
                <UploadForm onSuccess={handleVideoUpload} />
              ) : (
                <Button
                  onClick={() => setShowUploadForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan"
                >
                  Start Uploading
                </Button>
              )}
            </div>
          </div>

          {/* Videos List */}
          <div className="lg:col-span-2">
            <div className="glass-dark p-6 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Uploaded Videos</h2>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {videos.length} videos
                </span>
              </div>

              {videos.length > 0 ? (
                <div className="space-y-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-foreground/60 text-sm font-medium">Title</th>
                        <th className="text-left py-3 px-4 text-foreground/60 text-sm font-medium hidden sm:table-cell">
                          Professor
                        </th>
                        <th className="text-left py-3 px-4 text-foreground/60 text-sm font-medium hidden md:table-cell">
                          Uploaded
                        </th>
                        <th className="text-left py-3 px-4 text-foreground/60 text-sm font-medium hidden sm:table-cell">
                          Views
                        </th>
                        <th className="text-left py-3 px-4 text-foreground/60 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videos.map((video) => (
                        <tr key={video.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-start">
                              <div className="w-12 h-12 rounded bg-gradient-to-br from-primary/20 to-secondary/20 mr-3 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-foreground font-medium truncate">{video.title}</p>
                                <p className="text-sm text-foreground/60">{video.course}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-foreground/80 hidden sm:table-cell text-sm">{video.professor}</td>
                          <td className="py-4 px-4 text-foreground/80 hidden md:table-cell text-sm">{video.uploadedAt}</td>
                          <td className="py-4 px-4 text-foreground/80 hidden sm:table-cell text-sm">{video.views}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4 text-primary" />
                              </button>
                              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Edit">
                                <Edit2 className="w-4 h-4 text-primary" />
                              </button>
                              <button
                                onClick={() => handleDelete(video.id)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/60">No videos uploaded yet.</p>
                  <p className="text-sm text-foreground/40 mt-2">Upload your first video using the form on the left.</p>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="glass-dark p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{videos.length}</div>
                <p className="text-sm text-foreground/60 mt-1">Total Videos</p>
              </div>
              <div className="glass-dark p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-secondary">
                  {videos.reduce((sum, v) => sum + v.views, 0)}
                </div>
                <p className="text-sm text-foreground/60 mt-1">Total Views</p>
              </div>
              <div className="glass-dark p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(videos.reduce((sum, v) => sum + v.views, 0) / videos.length) || 0}
                </div>
                <p className="text-sm text-foreground/60 mt-1">Avg Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
