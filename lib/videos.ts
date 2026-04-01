export const CATEGORIES = [
  'All',
  'Movies',
  'Series',
  'Campus Stories',
  'Vlogs',
  'Educational',
  'Comedy',
  'Music',
  'Tutorials',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  uploadedBy: string;
  uploads: number;
  views: number;
  likes: number;
  category: Category;
  uploadedAt: Date;
  rating: number;
}

export const SAMPLE_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Campus Life in 2024',
    description: 'A creative look at student life on campus with friends and memorable moments.',
    thumbnail: 'https://images.unsplash.com/photo-1522495114468-49dc2d595078?w=500&h=300&fit=crop',
    duration: '12:34',
    uploadedBy: 'Alex Chen',
    uploads: 24,
    views: 15420,
    likes: 1240,
    category: 'Campus Stories',
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    rating: 4.8,
  },
  {
    id: '2',
    title: 'My Weekend Adventure',
    description: 'Exploring hidden gems around the city with amazing people.',
    thumbnail: 'https://images.unsplash.com/photo-1495146363666-400ad8122e74?w=500&h=300&fit=crop',
    duration: '8:45',
    uploadedBy: 'Jordan Smith',
    uploads: 18,
    views: 8921,
    likes: 612,
    category: 'Vlogs',
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    rating: 4.6,
  },
  {
    id: '3',
    title: 'Web Development Tutorial',
    description: 'Complete guide to building responsive web applications with React.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    duration: '45:12',
    uploadedBy: 'Sarah Johnson',
    uploads: 42,
    views: 52340,
    likes: 4210,
    category: 'Educational',
    uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Indie Film - Lost in Time',
    description: 'A short indie film about finding yourself in an unexpected journey.',
    thumbnail: 'https://images.unsplash.com/photo-1489599849228-ed5a00b3d5d7?w=500&h=300&fit=crop',
    duration: '32:18',
    uploadedBy: 'Film Collective',
    uploads: 8,
    views: 3450,
    likes: 289,
    category: 'Movies',
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    rating: 4.4,
  },
  {
    id: '5',
    title: 'Funny Campus Moments',
    description: 'Hilarious incidents and pranks that happened on campus this semester.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f70504c8a?w=500&h=300&fit=crop',
    duration: '15:22',
    uploadedBy: 'Pranksters Crew',
    uploads: 31,
    views: 28950,
    likes: 2156,
    category: 'Comedy',
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    rating: 4.7,
  },
  {
    id: '6',
    title: 'Guitar Tutorial - Beginner',
    description: 'Learn basic guitar chords and play your first song in 30 minutes.',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=300&fit=crop',
    duration: '28:45',
    uploadedBy: 'Music Master',
    uploads: 56,
    views: 89320,
    likes: 7234,
    category: 'Tutorials',
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    rating: 4.8,
  },
  {
    id: '7',
    title: 'Original Song - Midnight Dreams',
    description: 'An original composition about chasing dreams and finding love.',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
    duration: '4:32',
    uploadedBy: 'Luna Records',
    uploads: 12,
    views: 5634,
    likes: 521,
    category: 'Music',
    uploadedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    rating: 4.5,
  },
  {
    id: '8',
    title: 'Web Series - Chapter 1',
    description: 'A thrilling web series about mystery and intrigue on campus.',
    thumbnail: 'https://images.unsplash.com/photo-1516557591411-121a694c1bb9?w=500&h=300&fit=crop',
    duration: '22:15',
    uploadedBy: 'Studio Creations',
    uploads: 6,
    views: 4120,
    likes: 345,
    category: 'Series',
    uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    rating: 4.6,
  },
];
