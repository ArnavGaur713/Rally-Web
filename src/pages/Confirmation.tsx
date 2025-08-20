import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, MapPin, Users, Share2, Download, Trophy, Star } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { mockEvents } from "@/data/mockEvents";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSlot = searchParams.get('slot') || '';
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<{title: string, icon: string, description: string} | null>(null);
  
  const event = mockEvents.find(e => e.id === eventId);
  
  const badges = [
    { title: "Rising Star", icon: "🏅", description: "First event booked!" },
    { title: "Rally Pro", icon: "🎖️", description: "Sports enthusiast!" },
    { title: "Community Builder", icon: "🤝", description: "Bringing people together!" },
    { title: "Game Changer", icon: "⚡", description: "Always ready to play!" },
    { title: "Team Player", icon: "🏆", description: "Great teammate!" }
  ];

  useEffect(() => {
    // Show confetti animation
    setShowConfetti(true);
    
    // Award random badge
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    setEarnedBadge(randomBadge);
    
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Event not found</h1>
          <Link to="/find-my-game">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm joining ${event.title}!`,
        text: `Check out this awesome ${event.sport} event I'm attending!`,
        url: window.location.origin + `/events/${eventId}`
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        `I'm joining ${event.title}! Check it out: ${window.location.origin}/events/${eventId}`
      );
      alert("Event details copied to clipboard!");
    }
  };

  const totalAmount = (event.price + 2.99).toFixed(2);

  return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Navigation />
        
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* ... keep existing code (success header and content) */}
        
        <div className="container mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow animate-pulse">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-2">Booking Confirmed! 🎉</h1>
            <p className="text-xl text-muted-foreground">Step 3 of 3 - You're all set!</p>
          </div>

          {/* ... keep existing code (rest of content) */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Summary */}
              <Card className="rally-card">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">{event.title}</h2>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedSlot}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>

                  <div className="bg-secondary/5 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="font-medium">You're in!</p>
                        <p className="text-sm text-muted-foreground">
                          You'll receive event updates and can connect with other participants
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleShare} variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Event
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Event Details
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Badge Achievement */}
              {earnedBadge && (
                <Card className="rally-card">
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex items-center space-x-4">
                      <div className="text-6xl">{earnedBadge.icon}</div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Trophy className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold text-foreground">Badge Earned!</h3>
                        </div>
                        <h4 className="text-lg font-semibold text-primary mb-1">{earnedBadge.title}</h4>
                        <p className="text-muted-foreground">{earnedBadge.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* What's Next */}
              <Card className="rally-card">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">What's Next?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold mt-0.5">1</div>
                      <div>
                        <p className="font-medium">Check your email</p>
                        <p className="text-sm text-muted-foreground">We've sent you a confirmation email with all the details</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold mt-0.5">2</div>
                      <div>
                        <p className="font-medium">Join the event chat</p>
                        <p className="text-sm text-muted-foreground">Connect with other participants before the event</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold mt-0.5">3</div>
                      <div>
                        <p className="font-medium">Show up and have fun!</p>
                        <p className="text-sm text-muted-foreground">Arrive 15 minutes early and bring your sports gear</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <Card className="rally-card sticky top-8">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Payment Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event price</span>
                      <span className="font-medium">${event.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service fee</span>
                      <span className="font-medium">$2.99</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Paid</span>
                        <span className="text-primary">${totalAmount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 inline mr-1 text-secondary" />
                      Payment successful
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Receipt sent to your email
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link to="/find-my-game">
                      <Button className="w-full gradient-primary text-primary-foreground hover:opacity-90">
                        Find More Events
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button variant="outline" className="w-full">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Confirmation;