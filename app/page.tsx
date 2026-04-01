import { Navbar } from '@/components/navbar';
import { CourseCard } from '@/components/course-card';
import { COURSES } from '@/lib/course-data';
import { ArrowRight, Zap, Users, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'BITStream - Premium Educational Platform',
  description: 'Learn from world-class instructors. Curated courses in Computer Science, Web Development, AI, and more.',
};

export const revalidate = 0;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-20" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                Welcome to BITStream ✨
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
              Learn from the
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Best in Industry
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access curated courses in Computer Science, Web Development, AI, Security, and Databases. Learn at your own pace with world-class instructors.
            </p>

            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:gap-3">
              Explore Courses
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">20+</p>
              <p className="text-muted-foreground">Expert Courses</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors duration-300 text-center">
              <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">15K+</p>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors duration-300 text-center">
              <Zap className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">100+</p>
              <p className="text-muted-foreground">Video Lectures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Handpicked courses covering the latest technologies and essential computer science fundamentals.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => (
              <div key={course.id} className="animate-slide-in-up">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-secondary/5 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to start learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Pick a course and begin your journey into Computer Science excellence.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300">
            Browse All Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">BITStream</h3>
              <p className="text-muted-foreground text-sm">Premium educational platform for aspiring engineers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instructors</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
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
