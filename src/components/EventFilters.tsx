import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface EventFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  sport: string;
  skillLevel: string;
  priceRange: string;
  date: string;
}

const EventFilters = ({ onFilterChange }: EventFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sport: 'all',
    skillLevel: 'all',
    priceRange: 'all',
    date: 'all'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const sports = [
    { value: 'all', label: 'All Sports', emoji: '🏃‍♂️' },
    { value: 'tennis', label: 'Tennis', emoji: '🎾' },
    { value: 'basketball', label: 'Basketball', emoji: '🏀' },
    { value: 'soccer', label: 'Soccer', emoji: '⚽' },
    { value: 'volleyball', label: 'Volleyball', emoji: '🏐' },
    { value: 'badminton', label: 'Badminton', emoji: '🏸' },
    { value: 'swimming', label: 'Swimming', emoji: '🏊‍♀️' }
  ];

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Update active filters for display
    const newActiveFilters = Object.entries(newFilters)
      .filter(([_, val]) => val !== 'all')
      .map(([key, val]) => `${key}:${val}`);
    setActiveFilters(newActiveFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      sport: 'all',
      skillLevel: 'all',
      priceRange: 'all',
      date: 'all'
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-card rally-card mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Find Your Perfect Game</h3>
          </div>
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear all
            </Button>
          )}
        </div>

        {/* Quick Sport Filters */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2 mb-4">
          {sports.map((sport) => (
            <Button
              key={sport.value}
              variant={filters.sport === sport.value ? "default" : "outline"}
              size="sm"
              className={`h-auto py-2 px-3 flex flex-col items-center space-y-1 ${
                filters.sport === sport.value 
                  ? 'gradient-primary text-primary-foreground shadow-playful' 
                  : 'hover:shadow-card'
              }`}
              onClick={() => updateFilter('sport', sport.value)}
            >
              <span className="text-lg">{sport.emoji}</span>
              <span className="text-xs">{sport.label}</span>
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Skill Level
            </label>
            <Select value={filters.skillLevel} onValueChange={(value) => updateFilter('skillLevel', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any level</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Price Range
            </label>
            <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any price</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="low">$1 - $20</SelectItem>
                <SelectItem value="medium">$21 - $40</SelectItem>
                <SelectItem value="high">$40+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Date
            </label>
            <Select value={filters.date} onValueChange={(value) => updateFilter('date', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="weekend">This weekend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => {
                const [key, value] = filter.split(':');
                return (
                  <Badge key={filter} variant="secondary" className="flex items-center space-x-1">
                    <span>{key}: {value}</span>
                    <button
                      onClick={() => updateFilter(key as keyof FilterState, 'all')}
                      className="ml-1 hover:bg-background/20 rounded-full p-0.5"
                    >
                      ✕
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilters;