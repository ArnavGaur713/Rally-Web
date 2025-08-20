import Navigation from "@/components/ui/navigation";
import EventCard from "@/components/EventCard";
import EventFilters, { FilterState } from "@/components/EventFilters";
import { mockEvents } from "@/data/mockEvents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, MapPin, Calendar } from "lucide-react";
import { useState, useMemo } from "react";

const FindMyGame = () => {
  const [filters, setFilters] = useState<FilterState>({
    sport: 'all',
    skillLevel: 'all',
    priceRange: 'all',
    date: 'all'
  });

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      if (filters.sport !== 'all' && event.sport.toLowerCase() !== filters.sport) {
        return false;
      }
      if (filters.skillLevel !== 'all' && event.skillLevel.toLowerCase() !== filters.skillLevel) {
        return false;
      }
      if (filters.priceRange !== 'all') {
        const price = event.price;
        switch (filters.priceRange) {
          case 'free':
            return price === 0;
          case 'low':
            return price > 0 && price <= 20;
          case 'medium':
            return price > 20 && price <= 40;
          case 'high':
            return price > 40;
        }
      }
      if (filters.date !== 'all') {
        const eventDate = event.date.toLowerCase();
        return eventDate.includes(filters.date);
      }
      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Matching
            </Badge>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              <Users className="w-3 h-3 mr-1" />
              Find Your Squad
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect Game
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover sports events tailored to your preferences. Filter by sport, skill level, and location to find your ideal match.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Local & Online Events
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Flexible Scheduling
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              All Skill Levels
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Filters */}
        <EventFilters onFilterChange={handleFilterChange} />

        {/* Events Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {filters.sport === 'all' ? 'All Events' : `${filters.sport.charAt(0).toUpperCase() + filters.sport.slice(1)} Events`}
              </h2>
              <p className="text-muted-foreground">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                {filters.sport !== 'all' || filters.skillLevel !== 'all' || filters.priceRange !== 'all' || filters.date !== 'all' 
                  ? ' with your filters' 
                  : ''}
              </p>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="animate-fade-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-playful">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to find more events.
              </p>
              <Button onClick={() => handleFilterChange({
                sport: 'all',
                skillLevel: 'all', 
                priceRange: 'all',
                date: 'all'
              })}>
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FindMyGame;