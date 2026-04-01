'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import VideoPlayer from '@/components/video-player';
import { ThumbsUp, ThumbsDown, Share2, BookmarkPlus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WatchPage() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer
            videoUrl="https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4"
            title="Advanced Data Structures & Algorithms - Lecture 1"
          />
        </div>

        {/* Video Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Advanced Data Structures & Algorithms - Lecture 1
            </h1>
            <p className="text-foreground/70">
              Learn advanced data structures including AVL trees, Red-Black trees, and graph algorithms.
            </p>
          </div>

          {/* Stats & Actions */}
          <div className="glass-dark p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-foreground/60">Professor</p>
              <p className="text-lg font-semibold text-foreground">Prof. John Smith</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Branch</p>
              <p className="text-lg font-semibold text-foreground">Computer Science & Engineering</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Duration</p>
              <p className="text-lg font-semibold text-foreground">1 hour 23 minutes</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60">Year</p>
              <p className="text-lg font-semibold text-foreground">2024</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={liked ? 'default' : 'outline'}
              className={liked ? 'bg-primary text-primary-foreground' : 'border-white/20'}
              onClick={() => setLiked(!liked)}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button variant="outline" className="border-white/20">
              <ThumbsDown className="w-4 h-4 mr-2" />
              Dislike
            </Button>
            <Button
              variant={saved ? 'default' : 'outline'}
              className={saved ? 'bg-primary text-primary-foreground' : 'border-white/20'}
              onClick={() => setSaved(!saved)}
            >
              <BookmarkPlus className="w-4 h-4 mr-2" />
              {saved ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" className="border-white/20">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Description</h2>
            <p className="text-foreground/70 leading-relaxed">
              This comprehensive lecture covers advanced data structures and algorithms that form the foundation
              of computer science. We explore AVL trees, Red-Black trees, heaps, and various graph algorithms
              including DFS, BFS, and shortest path algorithms. Perfect for interviews and competitive programming.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Topics Covered:</h3>
              <ul className="list-disc list-inside text-foreground/70 space-y-1">
                <li>AVL Trees and Rotations</li>
                <li>Red-Black Trees</li>
                <li>Heaps and Priority Queues</li>
                <li>Graph Representation and Traversal</li>
                <li>Shortest Path Algorithms (Dijkstra, Bellman-Ford)</li>
                <li>Minimum Spanning Trees</li>
              </ul>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Comments
            </h2>
            <div className="glass-dark p-4">
              <textarea
                placeholder="Share your thoughts about this lecture..."
                className="w-full bg-input border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                rows={3}
              />
              <div className="mt-3 flex justify-end">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Sample Comments */}
            <div className="space-y-4">
              {[
                {
                  author: 'Student One',
                  time: '2 days ago',
                  text: 'Great explanation of AVL trees! The visualization really helped me understand the rotations.',
                },
                {
                  author: 'Student Two',
                  time: '5 days ago',
                  text: 'Could you provide the code examples discussed in the lecture?',
                },
              ].map((comment, idx) => (
                <div key={idx} className="glass-dark p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{comment.author}</p>
                      <p className="text-sm text-foreground/60">{comment.time}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80">{comment.text}</p>
                  <button className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
