export interface Event {
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
  description: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: Array<{
    name: string;
    avatar: string;
  }>;
  image?: string;
  tags: string[];
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Sunset Tennis Doubles',
    sport: 'Tennis',
    date: 'Today',
    time: '6:00 PM',
    location: 'Central Park Courts',
    participants: 3,
    maxParticipants: 4,
    price: 25,
    skillLevel: 'Intermediate',
    description: 'Join us for an exciting doubles match as the sun sets! Perfect for intermediate players looking to improve their game in a friendly environment.',
    organizer: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b15a1b4b?w=150&h=150&fit=crop&crop=face'
    },
    attendees: [
      {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Lisa Park',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    ],
    tags: ['doubles', 'evening', 'intermediate']
  },
  {
    id: '2',
    title: 'Morning Basketball Pickup',
    sport: 'Basketball',
    date: 'Tomorrow',
    time: '8:00 AM',
    location: 'Riverside Courts',
    participants: 8,
    maxParticipants: 10,
    price: 15,
    skillLevel: 'Advanced',
    description: 'High-energy pickup game for experienced players. Come ready to compete and have fun!',
    organizer: {
      name: 'James Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    attendees: [
      {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
      }
    ],
    tags: ['pickup', 'morning', 'competitive']
  },
  {
    id: '3',
    title: 'Beginner Soccer Clinic',
    sport: 'Soccer',
    date: 'Wednesday',
    time: '7:30 PM',
    location: 'Green Valley Field',
    participants: 12,
    maxParticipants: 16,
    price: 20,
    skillLevel: 'Beginner',
    description: 'Learn the basics of soccer in a supportive environment. Perfect for newcomers to the sport!',
    organizer: {
      name: 'Carlos Martinez',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face'
    },
    attendees: [
      {
        name: 'Sophie Lee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Ryan O\'Connor',
        avatar: 'https://images.unsplash.com/photo-1558683596-b47fd2e3bf00?w=150&h=150&fit=crop&crop=face'
      }
    ],
    tags: ['clinic', 'beginner', 'coaching']
  },
  {
    id: '4',
    title: 'Beach Volleyball Tournament',
    sport: 'Volleyball',
    date: 'Saturday',
    time: '2:00 PM',
    location: 'Santa Monica Beach',
    participants: 6,
    maxParticipants: 12,
    price: 35,
    skillLevel: 'Intermediate',
    description: 'Join our beach volleyball tournament! Teams of 2, prizes for winners, and fun for all!',
    organizer: {
      name: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'
    },
    attendees: [
      {
        name: 'Jake Miller',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Chloe Davis',
        avatar: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=150&h=150&fit=crop&crop=face'
      }
    ],
    tags: ['tournament', 'beach', 'prizes']
  },
  {
    id: '5',
    title: 'Badminton Social Hour',
    sport: 'Badminton',
    date: 'Friday',
    time: '5:30 PM',
    location: 'Community Center',
    participants: 5,
    maxParticipants: 8,
    price: 18,
    skillLevel: 'Beginner',
    description: 'Casual badminton games with a social twist. Great for meeting new people and having fun!',
    organizer: {
      name: 'Arun Singh',
      avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face'
    },
    attendees: [
      {
        name: 'Anna Chen',
        avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=150&h=150&fit=crop&crop=face'
      },
      {
        name: 'Tom Wilson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
      }
    ],
    tags: ['social', 'casual', 'networking']
  },
  {
    id: '6',
    title: 'Swimming Technique Workshop',
    sport: 'Swimming',
    date: 'Sunday',
    time: '10:00 AM',
    location: 'Aquatic Center Pool',
    participants: 4,
    maxParticipants: 6,
    price: 40,
    skillLevel: 'Intermediate',
    description: 'Improve your swimming technique with professional coaching. Focus on stroke efficiency and speed.',
    organizer: {
      name: 'Coach Jennifer Liu',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
    },
    attendees: [
      {
        name: 'Mark Thompson',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
      }
    ],
    tags: ['workshop', 'coaching', 'technique']
  }
];