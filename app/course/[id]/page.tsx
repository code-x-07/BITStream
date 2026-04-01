import { Navbar } from '@/components/navbar';
import { getCourseById } from '@/lib/course-data';
import { Star, Users, Clock, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const course = getCourseById(params.id);
  
  return {
    title: course ? `${course.title} - BITStream` : 'Course Not Found',
    description: course?.description || 'Course not found',
  };
}

const colorMap = {
  cyan: 'from-cyan-500/20 to-blue-500/20',
  purple: 'from-purple-500/20 to-pink-500/20',
  pink: 'from-pink-500/20 to-rose-500/20',
  amber: 'from-amber-500/20 to-orange-500/20',
  emerald: 'from-emerald-500/20 to-green-500/20',
};

const accentMap = {
  cyan: 'text-cyan-400 bg-cyan-500/10',
  purple: 'text-purple-400 bg-purple-500/10',
  pink: 'text-pink-400 bg-pink-500/10',
  amber: 'text-amber-400 bg-amber-500/10',
  emerald: 'text-emerald-400 bg-emerald-500/10',
};

export default async function CoursePage(props: PageProps) {
  const params = await props.params;
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Course Header */}
      <div className={`bg-gradient-to-br ${colorMap[course.color]} border-b border-border py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-block mb-6 text-primary hover:text-primary/80 transition-colors">
            ← Back to courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{course.title}</h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${accentMap[course.color]}`}>
                  {course.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-sm font-semibold text-foreground">
                  {course.subject}
                </span>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="font-semibold text-foreground">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{course.totalHours} hours</span>
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Instructor</h3>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorMap[course.color]} flex items-center justify-center mb-4`}>
                <span className="text-lg font-bold text-white">{course.instructor.charAt(0)}</span>
              </div>
              <p className="font-semibold text-foreground">{course.instructor}</p>
              <p className="text-muted-foreground text-sm mb-4">{course.subject} Expert</p>
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lectures Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Course Content</h2>

          <div className="space-y-3">
            {course.lectures.map((lecture) => (
              <div
                key={lecture.id}
                className="group border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors mt-1">
                    <Play className="w-6 h-6 text-primary" fill="currentColor" />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {lecture.order}. {lecture.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{lecture.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lecture.duration}
                      </span>
                      <span className="text-xs text-primary font-medium">Watch Lecture</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">Course Stats</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">{course.lectures.length}</p>
              <p className="text-muted-foreground">Total Lectures</p>
            </div>
            <div className="border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-secondary mb-2">{course.totalHours}</p>
              <p className="text-muted-foreground">Hours of Content</p>
            </div>
            <div className="border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-accent mb-2">{course.rating}</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="border border-border rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-emerald-400 mb-2">{(course.students / 1000).toFixed(1)}k</p>
              <p className="text-muted-foreground">Enrolled Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to enroll?</h2>
          <p className="text-lg text-muted-foreground mb-8">Start learning from {course.instructor} today.</p>
          <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Enroll in Course
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 BITStream. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
