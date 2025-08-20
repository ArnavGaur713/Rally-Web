import Navigation from "@/components/ui/navigation";
import EventCard from "@/components/EventCard";
import EventFilters, { FilterState } from "@/components/EventFilters";
import { mockEvents } from "@/data/mockEvents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import { useState, useMemo } from "react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    sport: 'all',
    skillLevel: 'all',
    priceRange: 'all',
    date: 'all'
  });

  // Filter events based on current filters
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
        // Simple date filtering based on mock data
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
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={heroImage}
          alt="PlayPal Rally Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge className="bg-primary/20 text-white border-white/20 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Matching
              </Badge>
              <Badge className="bg-secondary/20 text-white border-white/20 backdrop-blur-sm">
                <Users className="w-3 h-3 mr-1" />
                Community First
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-slide-up">
              Your sport, your squad,
              <span className="block gradient-primary bg-clip-text text-transparent">
                your vibe
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-slide-up">
              Discover amazing sports events, connect with your community, and play your way to new friendships.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-slide-up">
              <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 shadow-glow animate-pulse-glow">
                <Sparkles className="w-5 h-5 mr-2" />
                Find My Game
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center rally-card bounce-hover">
            <div className="p-6">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-playful">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">2,500+</h3>
              <p className="text-muted-foreground">Active Players</p>
            </div>
          </div>
          
          <div className="text-center rally-card bounce-hover">
            <div className="p-6">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-playful">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">150+</h3>
              <p className="text-muted-foreground">Weekly Events</p>
            </div>
          </div>
          
          <div className="text-center rally-card bounce-hover">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-playful">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">98%</h3>
              <p className="text-muted-foreground">Happy Players</p>
            </div>
          </div>
        </div>

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
            
            {/* Sort dropdown could go here */}
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

export default Index;
