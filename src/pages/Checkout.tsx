import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Clock, Users, Star, CreditCard } from "lucide-react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { mockEvents } from "@/data/mockEvents";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Checkout = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const { user } = useAuth();
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const event = mockEvents.find(e => e.id === eventId);
  
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

  const availableSlots = [
    "Today 6:00 PM - 8:00 PM",
    "Tomorrow 7:00 AM - 9:00 AM", 
    "Tomorrow 6:00 PM - 8:00 PM",
    "Friday 6:00 PM - 8:00 PM"
  ];

  const handleProceedToPayment = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    navigate(`/payment/${eventId}?slot=${encodeURIComponent(selectedSlot)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/find-my-game">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Review & Book</h1>
            <p className="text-muted-foreground">Step 1 of 3 - Review event details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Overview Card */}
            <Card className="rally-card">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{event.title}</h2>
                    <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.participants} joined
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {event.sport}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4">{event.description}</p>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.8 (127 reviews)</span>
                </div>
              </div>
            </Card>

            {/* Time Slot Selection */}
            <Card className="rally-card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Select Your Time Slot</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSlot === slot
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium">{slot}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {index === 0 ? '2 spots left' : `${Math.floor(Math.random() * 5) + 3} spots left`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* What's Included */}
            <Card className="rally-card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">What's Included</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Professional coaching and guidance
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    All necessary equipment provided
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Refreshments and water
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Access to community chat group
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="rally-card sticky top-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event</span>
                    <span className="font-medium">{event.sport} Session</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time</span>
                    <span className="font-medium text-sm">{selectedSlot || "Select slot"}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skill Level</span>
                    <span className="font-medium">{event.skillLevel}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per person</span>
                    <span className="font-medium">${event.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="font-medium">$2.99</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${(event.price + 2.99).toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
                  size="lg"
                  onClick={handleProceedToPayment}
                  disabled={!selectedSlot}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Free cancellation up to 24 hours before the event
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;