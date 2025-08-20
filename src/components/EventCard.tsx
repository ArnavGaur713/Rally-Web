import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  price: number;
  skillLevel: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: Array<{
    name: string;
    avatar: string;
  }>;
  image?: string;
}

const EventCard = ({ 
  id,
  title, 
  sport, 
  date, 
  time, 
  location, 
  participants, 
  maxParticipants, 
  price, 
  skillLevel,
  organizer,
  attendees,
  image 
}: EventCardProps) => {
  const sportEmojis: Record<string, string> = {
    tennis: '🎾',
    basketball: '🏀',
    soccer: '⚽',
    volleyball: '🏐',
    badminton: '🏸',
    swimming: '🏊‍♀️',
    running: '🏃‍♂️'
  };

  const skillColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="rally-card group cursor-pointer">
      {/* Image/Header */}
      <div className="relative h-48 bg-gradient-secondary overflow-hidden">
        {image && (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Sport Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-background/90 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl">{sportEmojis[sport.toLowerCase()] || '🏃‍♂️'}</span>
        </div>

        {/* Price */}
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          ${price}
        </div>

        {/* Skill Level */}
        <div className="absolute bottom-4 left-4">
          <Badge className={`${skillColors[skillLevel.toLowerCase()]} border-0`}>
            {skillLevel}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">{sport}</p>
          </div>
          
          {/* Organizer */}
          <Avatar className="w-8 h-8">
            <AvatarImage src={organizer.avatar} />
            <AvatarFallback>{organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
            <Clock className="w-4 h-4 ml-4 mr-2" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>{participants}/{maxParticipants} joined</span>
          </div>
        </div>

        {/* Attendees */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {attendees.slice(0, 3).map((attendee, index) => (
                <Avatar key={index} className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback className="text-xs">
                    {attendee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {attendees.length > 3 && (
                <div className="w-6 h-6 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{attendees.length - 3}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {attendees.length > 0 && `${attendees[0].name}${attendees.length > 1 ? ` and ${attendees.length - 1} others` : ''}`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="gradient-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(participants / maxParticipants) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {maxParticipants - participants} spots left
          </p>
        </div>

        {/* Action Button */}
        <Link to={`/checkout/${id}`}>
          <Button className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Join Rally 🎉
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;