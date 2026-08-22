'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Zap, Droplet, Trash2, X, RefreshCw, Building2 } from 'lucide-react';

export interface CityNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'normal' | 'attention' | 'critical';
  type: 'depot' | 'plant' | 'transit' | 'hub' | 'commercial';
  metric: string;
  details: string;
}

export const CampusMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<CityNode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const nodes: CityNode[] = [
    {
      id: 'node-indore-central',
      name: 'Indore Central Municipal Depot',
      lat: 22.7196,
      lng: 75.8577,
      status: 'normal',
      type: 'depot',
      metric: '⚡ Energy: 1,420 MWh Grid Load',
      details: 'Central municipal grid operating at 94% efficiency. Sub-station 4 balanced.',
    },
    {
      id: 'node-pithampur',
      name: 'Pithampur Industrial Recycling Plant',
      lat: 22.6150,
      lng: 75.6825,
      status: 'critical',
      type: 'plant',
      metric: '🏭 Waste: 42.1 Tons Recovered',
      details: 'Bulk plastic & e-waste processing facility. Heavy sorting active.',
    },
    {
      id: 'node-super-corridor',
      name: 'Super Corridor Smart Transit Zone',
      lat: 22.7545,
      lng: 75.8240,
      status: 'attention',
      type: 'transit',
      metric: '💧 Water: 410 kL/day Smart Grid',
      details: 'IoT acoustic leak detectors active across 14 km pipeline network.',
    },
    {
      id: 'node-rau-hub',
      name: 'Rau Urban Circular Economy Hub',
      lat: 22.6710,
      lng: 75.8165,
      status: 'normal',
      type: 'hub',
      metric: '♻️ Recycling: 9.8 Tons Processed',
      details: 'Community material collection & upcycling center operating smoothly.',
    },
    {
      id: 'node-vijay-nagar',
      name: 'Vijay Nagar Commercial Sector',
      lat: 22.7560,
      lng: 75.8910,
      status: 'normal',
      type: 'commercial',
      metric: '⚡ Solar Auxiliary Active',
      details: 'Rooftop commercial solar panels generating 120 kW surplus back to grid.',
    },
    {
      id: 'node-bhavarkua',
      name: 'Bhavarkua Metro Waste Station',
      lat: 22.6925,
      lng: 75.8650,
      status: 'normal',
      type: 'depot',
      metric: '🟢 Smart Waste Bins Optimal',
      details: 'Smart sensor bins operating at 42% average capacity. Collection queued.',
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamically import leaflet to prevent Next.js SSR errors
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize Leaflet Map centered on Indore Metropolitan City
      const map = L.map(mapContainerRef.current!, {
        center: [22.7196, 75.8577],
        zoom: 12,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add CartoDB Dark Matter tile layer for Squid Game dark aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Custom Zoom Control placed in bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Add Telemetry Line Connections (Polylines) across city zones
      const lineCoords: [number, number][] = [
        [22.7560, 75.8910], // Vijay Nagar
        [22.7545, 75.8240], // Super Corridor
        [22.7196, 75.8577], // Central Depot
        [22.6925, 75.8650], // Bhavarkua
        [22.6710, 75.8165], // Rau Hub
        [22.6150, 75.6825], // Pithampur
      ];

      L.polyline(lineCoords, {
        color: '#03E5B7',
        weight: 2,
        dashArray: '5, 8',
        opacity: 0.7,
      }).addTo(map);

      // Render GPS Markers for each city node
      nodes.forEach((node) => {
        const isCritical = node.status === 'critical';
        const isAttention = node.status === 'attention';

        const color = isCritical ? '#FF007A' : isAttention ? '#FFC700' : '#03E5B7';
        const glowClass = isCritical ? 'glow-pink' : isAttention ? 'glow-gold' : 'glow-teal';
        const iconSymbol = node.type === 'plant' ? '🏭' : node.type === 'depot' ? '🏬' : node.type === 'transit' ? '💧' : '♻️';

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <div class="w-8 h-8 rounded-full bg-[#07080E] border-2 border-[${color}] flex items-center justify-center text-xs shadow-lg ${glowClass} transform group-hover:scale-125 transition-all">
                <span>${iconSymbol}</span>
              </div>
              ${isCritical ? `<span class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF007A] animate-ping"></span>` : ''}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([node.lat, node.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          setSelectedNode(node);
          map.panTo([node.lat, node.lng], { animate: true });
        });
      });

      setIsLoaded(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-[#0D0F17] border border-[#1D2133] rounded-lg p-5 space-y-4 font-mono shadow-xl relative overflow-hidden">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#1D2133] pb-3">
        <div>
          <h3 className="text-sm font-black text-white flex items-center gap-2 tracking-wider">
            <MapPin className="w-4 h-4 text-[#FF007A]" />
            INDORE METROPOLITAN LIVE CITY GPS TELEMETRY MAP
          </h3>
          <p className="text-[11px] text-[#03E5B7] font-bold">
            Real-time municipal IoT sensors, industrial recycling plants & smart city grid indicators.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-[#03E5B7] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#03E5B7]" /> Normal Grid
          </span>
          <span className="flex items-center gap-1 text-[#FFC700] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FFC700]" /> High Load
          </span>
          <span className="flex items-center gap-1 text-[#FF007A] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" /> Anomaly Alert
          </span>
        </div>
      </div>

      {/* Real Interactive Leaflet Container */}
      <div className="relative w-full h-96 bg-[#07080E] rounded border border-[#1D2133] overflow-hidden z-10">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Selected Node Floating Telemetry Card */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 z-20 max-w-sm w-full bg-[#07080E]/95 border-2 border-[#FF007A] p-4 rounded-lg space-y-2 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-2 glow-pink">
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {selectedNode.type === 'plant' ? '🏭' : selectedNode.type === 'depot' ? '🏬' : selectedNode.type === 'transit' ? '💧' : '♻️'}
                </span>
                <h4 className="font-black text-white text-xs tracking-wider">{selectedNode.name}</h4>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white font-bold">
                <X className="w-4 h-4 text-[#FF007A]" />
              </button>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-black text-[#FF007A] flex items-center gap-1">
                {selectedNode.metric}
              </div>
              <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                {selectedNode.details}
              </p>
              <div className="text-[9px] text-[#03E5B7] pt-1 font-bold">
                GPS: {selectedNode.lat.toFixed(4)}° N, {selectedNode.lng.toFixed(4)}° E
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
