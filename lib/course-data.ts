export interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  subject: string;
  semester: string;
  branch: string;
  thumbnail: string;
  rating: number;
  students: number;
  lectures: Lecture[];
  totalHours: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  color: 'cyan' | 'purple' | 'pink' | 'amber' | 'emerald';
}

// Curated course data - only verified educational content
export const COURSES: Course[] = [
  {
    id: 'cs101',
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamentals of data structures and algorithmic thinking. Learn essential patterns used in technical interviews and production systems.',
    instructor: 'Dr. Sarah Chen',
    subject: 'Computer Science',
    semester: 'Fall 2024',
    branch: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    rating: 4.8,
    students: 2450,
    totalHours: '24',
    level: 'Intermediate',
    color: 'cyan',
    lectures: [
      { id: 'l1', title: 'Introduction to Big O Notation', duration: '45:32', videoUrl: 'https://example.com/video1', description: 'Learn how to analyze algorithm complexity', order: 1 },
      { id: 'l2', title: 'Arrays & Dynamic Arrays', duration: '52:15', videoUrl: 'https://example.com/video2', description: 'Understanding arrays and their operations', order: 2 },
      { id: 'l3', title: 'Linked Lists Implementation', duration: '48:20', videoUrl: 'https://example.com/video3', description: 'Deep dive into linked list data structures', order: 3 },
      { id: 'l4', title: 'Stack & Queue Operations', duration: '41:10', videoUrl: 'https://example.com/video4', description: 'LIFO and FIFO data structures', order: 4 },
    ],
  },
  {
    id: 'web301',
    title: 'Full-Stack Web Development',
    description: 'Build modern web applications using React, Node.js, and databases. From frontend design to backend architecture.',
    instructor: 'Prof. James Wilson',
    subject: 'Web Development',
    semester: 'Fall 2024',
    branch: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    rating: 4.9,
    students: 3120,
    totalHours: '32',
    level: 'Advanced',
    color: 'purple',
    lectures: [
      { id: 'l1', title: 'React Fundamentals', duration: '58:45', videoUrl: 'https://example.com/video1', description: 'Components, hooks, and state management', order: 1 },
      { id: 'l2', title: 'Node.js & Express Setup', duration: '44:30', videoUrl: 'https://example.com/video2', description: 'Building REST APIs with Express', order: 2 },
      { id: 'l3', title: 'Database Design with PostgreSQL', duration: '55:20', videoUrl: 'https://example.com/video3', description: 'Relational database fundamentals', order: 3 },
      { id: 'l4', title: 'Authentication & Security', duration: '49:15', videoUrl: 'https://example.com/video4', description: 'Secure user authentication patterns', order: 4 },
    ],
  },
  {
    id: 'ai201',
    title: 'Introduction to Machine Learning',
    description: 'Understand ML fundamentals: supervised learning, neural networks, and practical applications with Python.',
    instructor: 'Dr. Aisha Patel',
    subject: 'Artificial Intelligence',
    semester: 'Fall 2024',
    branch: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    rating: 4.7,
    students: 1890,
    totalHours: '28',
    level: 'Intermediate',
    color: 'pink',
    lectures: [
      { id: 'l1', title: 'ML Basics & Linear Regression', duration: '50:22', videoUrl: 'https://example.com/video1', description: 'Introduction to supervised learning', order: 1 },
      { id: 'l2', title: 'Classification Algorithms', duration: '46:18', videoUrl: 'https://example.com/video2', description: 'Logistic regression and decision trees', order: 2 },
      { id: 'l3', title: 'Neural Networks Deep Dive', duration: '62:40', videoUrl: 'https://example.com/video3', description: 'Building neural networks from scratch', order: 3 },
      { id: 'l4', title: 'Real-World ML Project', duration: '54:35', videoUrl: 'https://example.com/video4', description: 'End-to-end ML project walkthrough', order: 4 },
    ],
  },
  {
    id: 'db401',
    title: 'Advanced Database Systems',
    description: 'Explore distributed databases, indexing strategies, query optimization, and NoSQL technologies.',
    instructor: 'Prof. Michael Kumar',
    subject: 'Databases',
    semester: 'Fall 2024',
    branch: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    rating: 4.6,
    students: 980,
    totalHours: '26',
    level: 'Advanced',
    color: 'amber',
    lectures: [
      { id: 'l1', title: 'Indexing Strategies', duration: '48:45', videoUrl: 'https://example.com/video1', description: 'B-tree, hash, and bitmap indexes', order: 1 },
      { id: 'l2', title: 'Query Optimization', duration: '52:30', videoUrl: 'https://example.com/video2', description: 'Making queries fast and efficient', order: 2 },
      { id: 'l3', title: 'NoSQL Databases', duration: '45:15', videoUrl: 'https://example.com/video3', description: 'MongoDB, Redis, and beyond', order: 3 },
      { id: 'l4', title: 'Distributed Systems', duration: '58:20', videoUrl: 'https://example.com/video4', description: 'Scaling databases across nodes', order: 4 },
    ],
  },
  {
    id: 'security201',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn cryptography, secure coding, penetration testing, and defense strategies for modern applications.',
    instructor: 'Dr. Emma Rodriguez',
    subject: 'Security',
    semester: 'Fall 2024',
    branch: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    rating: 4.8,
    students: 1450,
    totalHours: '30',
    level: 'Intermediate',
    color: 'emerald',
    lectures: [
      { id: 'l1', title: 'Cryptography Essentials', duration: '55:40', videoUrl: 'https://example.com/video1', description: 'Encryption, hashing, and digital signatures', order: 1 },
      { id: 'l2', title: 'Secure Coding Practices', duration: '49:25', videoUrl: 'https://example.com/video2', description: 'Preventing common vulnerabilities', order: 2 },
      { id: 'l3', title: 'Network Security', duration: '51:10', videoUrl: 'https://example.com/video3', description: 'Firewalls, VPNs, and intrusion detection', order: 3 },
      { id: 'l4', title: 'Penetration Testing Intro', duration: '47:50', videoUrl: 'https://example.com/video4', description: 'Ethical hacking fundamentals', order: 4 },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(course => course.id === id);
}

export function getCoursesBySubject(subject: string): Course[] {
  return COURSES.filter(course => course.subject === subject);
}

export function getCoursesByLevel(level: string): Course[] {
  return COURSES.filter(course => course.level === level);
}
