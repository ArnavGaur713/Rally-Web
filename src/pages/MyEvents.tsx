import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, MapPin, Trash2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface UserEvent {
  id: string
  event_id: string
  event_title: string
  event_type: string
  event_date: string
  event_location: string
  event_price: number
  joined_at: string
}

const MyEvents = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [events, setEvents] = useState<UserEvent[]>([])
  const [loading, setLoading] = useState(true)

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', user.id)
        .order('joined_at', { ascending: false })

      if (error) {
        toast({
          title: "Error loading events",
          description: error.message,
          variant: "destructive"
        })
      } else {
        setEvents(data || [])
      }
      setLoading(false)
    }

    fetchUserEvents()
  }, [user, toast])

  const handleRemoveEvent = async (eventId: string) => {
    const { error } = await supabase
      .from('user_events')
      .delete()
      .eq('id', eventId)
      .eq('user_id', user!.id)

    if (error) {
      toast({
        title: "Error removing event",
        description: error.message,
        variant: "destructive"
      })
    } else {
      setEvents(prev => prev.filter(event => event.id !== eventId))
      toast({
        title: "Event removed",
        description: "Event has been removed from your list."
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">My Events</h1>
            <p className="text-muted-foreground">Events you've joined</p>
          </div>
        </div>

        {events.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-xl font-semibold mb-2">No events yet!</h2>
              <p className="text-muted-foreground mb-4">
                Start exploring and join some exciting sports events.
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Discover Events
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{event.event_title}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {event.event_type}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveEvent(event.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {event.event_date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {event.event_location}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-lg font-semibold">
                      ${event.event_price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Joined {new Date(event.joined_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyEvents