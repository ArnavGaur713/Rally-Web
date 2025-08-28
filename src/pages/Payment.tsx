import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Shield, Lock } from "lucide-react";
import { Link, useParams, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { mockEvents } from "@/data/mockEvents";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSlot = searchParams.get('slot') || '';
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: user?.email || ''
  });
  
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

  const handleInputChange = (field: string, value: string) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.name || !paymentForm.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Mock payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save event to user's account
      const { error } = await supabase
        .from('user_events')
        .insert({
          user_id: user!.id,
          event_id: eventId!,
          event_title: event!.title,
          event_type: event!.sport,
          event_date: event!.date,
          event_location: event!.location,
          event_price: event!.price
        });

      if (error) {
        toast({
          title: "Error saving event",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Payment successful!",
        description: "You've successfully joined the event."
      });

      navigate(`/confirmation/${eventId}?slot=${encodeURIComponent(selectedSlot)}`);
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalAmount = (event.price + 2.99).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to={`/checkout/${eventId}`}>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Review
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment</h1>
            <p className="text-muted-foreground">Step 2 of 3 - Secure payment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Notice */}
            <Card className="rally-card">
              <div className="p-4 bg-secondary/10 border-secondary/20">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium text-secondary">Secure Payment</p>
                    <p className="text-sm text-muted-foreground">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="rally-card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentForm.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentForm.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentForm.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Billing Information */}
            <Card className="rally-card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Billing Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={paymentForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={paymentForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="rally-card sticky top-8">
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{selectedSlot}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event price</span>
                      <span className="font-medium">${event.price}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service fee</span>
                      <span className="font-medium">$2.99</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${totalAmount}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pay ${totalAmount}
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-center mt-4 space-x-2 text-xs text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
                
                <p className="text-xs text-muted-foreground text-center mt-3">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;