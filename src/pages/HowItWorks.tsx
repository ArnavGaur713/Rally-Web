import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Search, Calendar, CheckCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Events",
      description: "Browse through hundreds of sports events in your area. Use our smart filters to find exactly what you're looking for.",
      details: ["Filter by sport type, skill level, and price", "AI-powered recommendations", "Real-time availability updates"]
    },
    {
      icon: Users,
      title: "Connect with Players",
      description: "See who's joining events and connect with like-minded players. Build your sports community one game at a time.",
      details: ["View player profiles and skill levels", "Chat with event organizers", "Join groups based on interests"]
    },
    {
      icon: Calendar,
      title: "Book Your Spot",
      description: "Reserve your spot with our simple booking system. Get instant confirmation and calendar sync.",
      details: ["Secure payment processing", "Automatic calendar integration", "Flexible cancellation policy"]
    },
    {
      icon: Trophy,
      title: "Play & Earn",
      description: "Attend events, meet new people, and earn badges for your achievements. Build your sports reputation!",
      details: ["Earn achievement badges", "Track your sports journey", "Unlock exclusive events"]
    }
  ];

  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our smart algorithm suggests events based on your preferences, skill level, and past activities.",
      icon: "🤖"
    },
    {
      title: "Community First",
      description: "Connect with fellow sports enthusiasts and build lasting friendships through shared interests.",
      icon: "👥"
    },
    {
      title: "Flexible Scheduling",
      description: "Find events that fit your schedule with options for different times, dates, and durations.",
      icon: "📅"
    },
    {
      title: "All Skill Levels",
      description: "From beginners to pros, find events that match your skill level and help you improve.",
      icon: "🏆"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Simple & Fun
            </Badge>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              <Users className="w-3 h-3 mr-1" />
              Community Driven
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How PlayPal Rally Works
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts in just 4 simple steps. It's easier than you think!
          </p>

          <Link to="/find-my-game">
            <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Playing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get Started in 4 Easy Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From discovery to playing, we've made it simple to find and join sports events in your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center rally-card bounce-hover">
                <div className="p-6">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-playful">
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose PlayPal Rally?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're not just another booking platform. We're building a community of sports lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rally-card bounce-hover">
                <div className="p-6 flex items-start space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Join the Fun?
            </h2>
            <p className="text-muted-foreground mb-8">
              Thousands of players are already using PlayPal Rally to discover amazing sports events and make new friends.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/find-my-game">
                <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 shadow-glow">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find My Game
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;