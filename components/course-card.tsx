import { Star, Users, Clock } from 'lucide-react';
import { Course } from '@/lib/course-data';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
}

const colorMap = {
  cyan: 'from-cyan-500/20 to-blue-500/20',
  purple: 'from-purple-500/20 to-pink-500/20',
  pink: 'from-pink-500/20 to-rose-500/20',
  amber: 'from-amber-500/20 to-orange-500/20',
  emerald: 'from-emerald-500/20 to-green-500/20',
};

const accentMap = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
};

const borderMap = {
  cyan: 'border-cyan-500/20 hover:border-cyan-500/50',
  purple: 'border-purple-500/20 hover:border-purple-500/50',
  pink: 'border-pink-500/20 hover:border-pink-500/50',
  amber: 'border-amber-500/20 hover:border-amber-500/50',
  emerald: 'border-emerald-500/20 hover:border-emerald-500/50',
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className={`group relative rounded-xl border backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl ${borderMap[course.color]} border ${borderMap[course.color]}`}>
        {/* Background gradient based on course color */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[course.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header with badge */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {course.title}
              </h3>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${accentMap[course.color]}`}>
              {course.level}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 mb-4 flex-grow line-clamp-2">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colorMap[course.color]} flex items-center justify-center`}>
              <span className="text-xs font-bold text-white">{course.instructor.charAt(0)}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{course.instructor}</p>
              <p className="text-xs text-muted-foreground">{course.subject}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                <Star className="w-4 h-4" fill="currentColor" />
                {course.rating}
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                <Users className="w-4 h-4" />
                {(course.students / 1000).toFixed(1)}k
              </div>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-foreground">
                <Clock className="w-4 h-4" />
                {course.totalHours}h
              </div>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-300 ${accentMap[course.color]} bg-white/10 group-hover:bg-white/20 text-sm`}>
            View Course →
          </button>
        </div>
      </div>
    </Link>
  );
}
