'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UploadForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    professor: '',
    year: '2024',
    branch: 'CSE',
    course: '',
    type: 'lecture',
    duration: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a video file');
      return;
    }

    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        professor: '',
        year: '2024',
        branch: 'CSE',
        course: '',
        type: 'lecture',
        duration: '',
      });
      setFile(null);
      setTimeout(() => setSuccess(false), 3000);
      onSuccess?.();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-200">
          Video uploaded successfully!
        </div>
      )}

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground/80 mb-3">
          Video File
        </label>
        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-8 h-8 text-primary/50 mx-auto mb-3" />
            <p className="text-foreground/80">
              {file ? file.name : 'Click to select or drag and drop your video file'}
            </p>
          </label>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Video Details</h3>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter video title"
            className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter video description"
            rows={4}
            className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Professor Name
          </label>
          <input
            type="text"
            name="professor"
            value={formData.professor}
            onChange={handleInputChange}
            placeholder="e.g., Prof. John Smith"
            className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
              <option value="CE">Civil</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Course
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              placeholder="e.g., Data Structures"
              className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">
              Content Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="lecture">Lecture</option>
              <option value="tutorial">Tutorial</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Duration (HH:MM:SS)
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 01:23:45"
            className="w-full bg-input border border-white/10 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={uploading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan"
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </form>
  );
}
