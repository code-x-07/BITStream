import { Navbar } from '@/components/navbar';
import { COURSES } from '@/lib/course-data';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard - BITStream',
  description: 'Manage courses and content on BITStream',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage courses and platform content</p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              New Course
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Courses</p>
              <p className="text-3xl font-bold text-foreground">{COURSES.length}</p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Students</p>
              <p className="text-3xl font-bold text-foreground">{(COURSES.reduce((acc, c) => acc + c.students, 0) / 1000).toFixed(1)}k</p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Lectures</p>
              <p className="text-3xl font-bold text-foreground">{COURSES.reduce((acc, c) => acc + c.lectures.length, 0)}</p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
              <p className="text-muted-foreground text-sm font-medium mb-2">Avg Rating</p>
              <p className="text-3xl font-bold text-foreground">{(COURSES.reduce((acc, c) => acc + c.rating, 0) / COURSES.length).toFixed(1)}</p>
            </div>
          </div>

          {/* Courses Table */}
          <div className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Instructor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Students</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Lectures</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COURSES.map((course) => (
                    <tr key={course.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{course.title}</p>
                          <p className="text-sm text-muted-foreground">{course.subject}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{course.instructor}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{(course.students / 1000).toFixed(1)}k</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-foreground font-medium">{course.rating}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{course.lectures.length}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Course Form */}
          <div className="mt-12 border border-border rounded-xl p-8 bg-card/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6">Add New Course</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Course Title</label>
                  <input
                    type="text"
                    placeholder="Enter course title"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Instructor</label>
                  <input
                    type="text"
                    placeholder="Enter instructor name"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  placeholder="Enter course description"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Level</label>
                  <select className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Total Hours</label>
                  <input
                    type="number"
                    placeholder="24"
                    className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 BITStream Admin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
