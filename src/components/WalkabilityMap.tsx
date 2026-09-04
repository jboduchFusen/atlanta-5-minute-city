import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import { Search, MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationData {
  lat: number;
  lng: number;
  name: string;
}

const MapController = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  if (center) {
    map.flyTo(center, 14, { duration: 1 });
  }
  return null;
};

export default function WalkabilityMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [walkabilityRadius, setWalkabilityRadius] = useState(5); // 5 minutes walk
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  // Atlanta neighborhoods with coordinates
  const atlantaLocations: LocationData[] = [
    { lat: 33.7490, lng: -84.3880, name: 'Downtown Atlanta' },
    { lat: 33.7693, lng: -84.3901, name: 'Inman Park' },
    { lat: 33.7550, lng: -84.3850, name: 'East Atlanta' },
    { lat: 33.7850, lng: -84.3750, name: 'Virginia Highland' },
    { lat: 33.7800, lng: -84.3900, name: 'Midtown' },
    { lat: 33.7490, lng: -84.3880, name: 'Peachtree Center' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate geocoding - in production, use Nominatim or Google Maps API
      const query = searchQuery.toLowerCase();
      const found = atlantaLocations.find(loc => 
        loc.name.toLowerCase().includes(query)
      );

      if (found) {
        setSelectedLocation(found);
      } else {
        // Default to Atlanta center if not found
        setSelectedLocation({
          lat: 33.7490,
          lng: -84.3880,
          name: searchQuery || 'Atlanta'
        });
      }
    } catch (err) {
      setError('Failed to find location. Try another search.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: 'Your Location'
          });
          setIsLoading(false);
        },
        () => {
          setError('Unable to get your location');
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported');
      setIsLoading(false);
    }
  };

  // Calculate walking distance in km (average walking speed: 1.4 m/s = 5 km/h)
  const radiusInKm = (walkabilityRadius / 60) * 5;

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Atlanta neighborhoods..."
                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition"
            >
              Search
            </button>
          </div>
        </form>

        <button
          onClick={handleUseCurrentLocation}
          disabled={isLoading}
          className="mb-4 flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2 text-primary hover:bg-primary/20 disabled:opacity-50 transition w-full justify-center"
        >
          <Navigation className="h-4 w-4" />
          Use My Location
        </button>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-2 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Walkability Radius Slider */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Walkability Radius: {walkabilityRadius} minutes ({radiusInKm.toFixed(2)} km)
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={walkabilityRadius}
            onChange={(e) => setWalkabilityRadius(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-foreground/50">
            <span>1 min</span>
            <span>15 min</span>
            <span>30 min</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-xs text-foreground/70 mb-1">Walking Speed</p>
            <p className="text-lg font-bold text-primary">5 km/h</p>
          </div>
          <div className="rounded-lg bg-accent/10 p-4">
            <p className="text-xs text-foreground/70 mb-1">Reachable Area</p>
            <p className="text-lg font-bold text-accent">{radiusInKm.toFixed(2)} km</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-xl border border-border shadow-sm h-96">
        <MapContainer
          center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [33.7490, -84.3880]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedLocation && (
            <>
              <MapController center={[selectedLocation.lat, selectedLocation.lng]} />
              
              {/* Walkability Circle */}
              <Circle
                center={[selectedLocation.lat, selectedLocation.lng]}
                radius={radiusInKm * 1000} // Convert to meters
                pathOptions={{
                  color: 'hsl(34, 89%, 45%)',
                  fillColor: 'hsl(34, 89%, 45%)',
                  fillOpacity: 0.15,
                  weight: 2,
                  dashArray: '5, 5'
                }}
              />

              {/* Center Marker */}
              <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                <Popup>
                  <div className="text-sm font-semibold">{selectedLocation.name}</div>
                  <div className="text-xs text-foreground/70 mt-1">
                    {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* Nearby Locations */}
          {selectedLocation && atlantaLocations.map((location, idx) => {
            const distance = Math.sqrt(
              Math.pow(location.lat - selectedLocation.lat, 2) +
              Math.pow(location.lng - selectedLocation.lng, 2)
            ) * 111; // Rough conversion to km

            if (distance > 0 && distance < radiusInKm) {
              return (
                <Marker key={idx} position={[location.lat, location.lng]}>
                  <Popup>
                    <div className="text-sm font-semibold">{location.name}</div>
                    <div className="text-xs text-foreground/70 mt-1">
                      {distance.toFixed(2)} km away
                    </div>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{selectedLocation.name}</h3>
              <p className="text-sm text-foreground/70 mt-1">
                Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-foreground/70">Walkable Radius</p>
                  <p className="font-bold text-foreground mt-1">{walkabilityRadius} min</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/70">Distance Coverage</p>
                  <p className="font-bold text-foreground mt-1">{radiusInKm.toFixed(2)} km</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/70">Nearby Places</p>
                  <p className="font-bold text-foreground mt-1">
                    {atlantaLocations.filter(loc => {
                      const distance = Math.sqrt(
                        Math.pow(loc.lat - selectedLocation.lat, 2) +
                        Math.pow(loc.lng - selectedLocation.lng, 2)
                      ) * 111;
                      return distance > 0 && distance < radiusInKm;
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
