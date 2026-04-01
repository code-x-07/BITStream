'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterState {
  search: string;
  year: string;
  branch: string;
  course: string;
  professor: string;
  type: string;
}

export default function SearchFilter({ onFilterChange }: { onFilterChange: (filters: FilterState) => void }) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    year: '',
    branch: '',
    course: '',
    professor: '',
    type: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const emptyFilters = {
      search: '',
      year: '',
      branch: '',
      course: '',
      professor: '',
      type: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          {/* Main Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by video title, course, or professor..."
              value={filters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              className="w-full bg-input border border-white/20 rounded-lg pl-10 pr-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {showAdvanced ? '− Hide Advanced Filters' : '+ Show Advanced Filters'}
          </button>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="glass-dark p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full bg-input border border-white/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Years</option>
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
                  value={filters.branch}
                  onChange={(e) => handleChange('branch', e.target.value)}
                  className="w-full bg-input border border-white/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Branches</option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="ME">Mechanical</option>
                  <option value="CE">Civil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Course
                </label>
                <input
                  type="text"
                  placeholder="e.g., Data Structures"
                  value={filters.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className="w-full bg-input border border-white/10 rounded-lg px-3 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Content Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full bg-input border border-white/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">All Types</option>
                  <option value="lecture">Lecture</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
            </div>
          )}

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    {filters.search}
                    <button
                      onClick={() => handleChange('search', '')}
                      className="hover:text-primary/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.year && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm">
                    {filters.year}
                    <button onClick={() => handleChange('year', '')} className="hover:text-secondary/80">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="border-white/20 text-foreground/80 hover:bg-white/5"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
