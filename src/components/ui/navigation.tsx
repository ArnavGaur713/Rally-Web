import { Button } from "@/components/ui/button";
import { Search, User, Heart } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-playful">
              <span className="text-primary-foreground font-bold text-lg">🎾</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                PlayPal Rally
              </h1>
              <p className="text-xs text-muted-foreground">Your sport, your squad, your vibe</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Find your next game..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            <Button className="gradient-primary text-primary-foreground hover:opacity-90 shadow-playful">
              Join Event
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 animate-fade-slide-up">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Find your next game..."
                className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;