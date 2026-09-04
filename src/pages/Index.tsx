import { MapPin, Bike, Bus, Utensils, ShoppingBag, Home, Leaf, TrendingUp, Clock, Users } from 'lucide-react';

export default function Index() {
  const neighborhoods = [
    {
      name: 'Inman Park',
      walkScore: 92,
      bikeScore: 88,
      image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=400&h=300&fit=crop',
      services: ['Coffee', 'Dining', 'Retail', 'Transit'],
      transit: 'MARTA, Bike Share'
    },
    {
      name: 'East Atlanta',
      walkScore: 85,
      bikeScore: 82,
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop',
      services: ['Shopping', 'Food', 'Arts', 'Parks'],
      transit: 'MARTA, Bus'
    },
    {
      name: 'Virginia Highland',
      walkScore: 88,
      bikeScore: 85,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
      services: ['Dining', 'Shops', 'Grocery', 'Parks'],
      transit: 'Bike Share, Bus'
    },
    {
      name: 'Midtown',
      walkScore: 94,
      bikeScore: 87,
      image: 'https://images.unsplash.com/photo-1486299967070-08de336d36b3?w=400&h=300&fit=crop',
      services: ['Work', 'Dining', 'Entertainment', 'Retail'],
      transit: 'MARTA, Bike Share'
    }
  ];

  const services = [
    { icon: Utensils, label: 'Restaurants', count: '2,400+', color: 'from-orange-400 to-orange-600' },
    { icon: ShoppingBag, label: 'Retail', count: '1,800+', color: 'from-blue-400 to-blue-600' },
    { icon: Home, label: 'Housing', count: '12,000+', color: 'from-green-400 to-green-600' },
    { icon: Bus, label: 'Transit Routes', count: '150+', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold text-foreground sm:text-6xl">
            Atlanta 5-Minute City
          </h1>
          <p className="mb-8 text-xl text-foreground/70">
            Building walkable, connected neighborhoods where daily essentials are within reach
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Explore Neighborhoods
            </button>
            <button className="rounded-lg border-2 border-primary px-8 py-3 font-semibold text-primary hover:bg-primary/5 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className={`mb-4 inline-block rounded-lg bg-gradient-to-br ${service.color} p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">{service.label}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{service.count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Neighborhoods */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold text-foreground">Top 5-Minute Neighborhoods</h2>
        <p className="mb-12 text-lg text-foreground/70">Walkable areas where you can reach essentials in 5 minutes</p>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {neighborhoods.map((neighborhood, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-lg transition">
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img 
                  src={neighborhood.image} 
                  alt={neighborhood.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-4 text-2xl font-bold text-foreground">{neighborhood.name}</h3>
                
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground/70">Walk Score</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{neighborhood.walkScore}</p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Bike className="h-4 w-4 text-accent" />
                      <span className="text-sm text-foreground/70">Bike Score</span>
                    </div>
                    <p className="text-2xl font-bold text-accent">{neighborhood.bikeScore}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-foreground/70 mb-2">Available Services</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.services.map((service, i) => (
                      <span key={i} className="inline-block rounded-full bg-secondary/10 px-3 py-1 text-sm text-secondary">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border text-sm text-foreground/70">
                  <Bus className="h-4 w-4" />
                  <span>{neighborhood.transit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-12 text-3xl font-bold text-foreground text-center">Why 5-Minute Cities Matter</h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-8 hover:shadow-lg transition">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Economic Growth</h3>
            <p className="text-foreground/70">Local businesses thrive when customers can walk to them. 15% increase in foot traffic in walkable areas.</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-8 hover:shadow-lg transition">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Leaf className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Environmental Impact</h3>
            <p className="text-foreground/70">Reduced car dependency cuts emissions by 40%. Cleaner air, healthier communities, and better urban biodiversity.</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-8 hover:shadow-lg transition">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Community Health</h3>
            <p className="text-foreground/70">More walking means healthier residents. Active neighborhoods see 20% fewer chronic diseases.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Join the Movement?</h2>
        <p className="mb-8 text-lg text-foreground/70">Help us build a more walkable, connected Atlanta</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition">
            Get Involved
          </button>
          <button className="rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground hover:bg-accent/90 transition">
            Share Your Ideas
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h4 className="font-bold text-foreground mb-4">About</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-primary">Our Mission</a></li>
                <li><a href="#" className="hover:text-primary">Team</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-primary">Data & Maps</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Research</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-primary">Volunteer</a></li>
                <li><a href="#" className="hover:text-primary">Donate</a></li>
                <li><a href="#" className="hover:text-primary">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">Instagram</a></li>
                <li><a href="#" className="hover:text-primary">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/70">
            <p>&copy; 2024 Atlanta 5-Minute City. Building walkable neighborhoods for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
