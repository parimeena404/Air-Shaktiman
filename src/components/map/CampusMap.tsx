'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Zap, Droplet, Trash2, X, RefreshCw } from 'lucide-react';

export interface CampusNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'normal' | 'attention' | 'critical';
  type: 'building' | 'hostel' | 'canteen' | 'lab' | 'bin';
  metric: string;
  details: string;
}

export const CampusMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<CampusNode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const nodes: CampusNode[] = [
    {
      id: 'node-block-b',
      name: 'Block B (Tech Lab)',
      lat: 22.7245,
      lng: 75.8540,
      status: 'critical',
      type: 'lab',
      metric: '⚡ Energy: +22% Anomaly',
      details: 'Off-peak power surge detected (820 kW). Throttling AC recommended.',
    },
    {
      id: 'node-hostel-3',
      name: 'Hostel 3 (Girls)',
      lat: 22.7150,
      lng: 75.8625,
      status: 'critical',
      type: 'hostel',
      metric: '💧 Water: 31% Surge Leak',
      details: 'Sub-level 2 pipe rupture (2,800 L/day estimated loss). Plumber dispatched.',
    },
    {
      id: 'node-bin-42',
      name: 'Canteen Bin #42',
      lat: 22.7196,
      lng: 75.8577,
      status: 'critical',
      type: 'bin',
      metric: '🗑️ Waste: 94% Capacity',
      details: 'Predicted overflow in 4 hours. Automated collection route queued.',
    },
    {
      id: 'node-canteen',
      name: 'Main Canteen',
      lat: 22.7210,
      lng: 75.8565,
      status: 'attention',
      type: 'canteen',
      metric: '🟡 Valve Pressure Fluctuation',
      details: 'Water pressure varying between 2.1 – 3.4 bar.',
    },
    {
      id: 'node-block-a',
      name: 'Block A (Admin)',
      lat: 22.7260,
      lng: 75.8510,
      status: 'normal',
      type: 'building',
      metric: '🟢 Grid Normal (405 kW)',
      details: 'All HVAC and solar systems operating at peak efficiency.',
    },
    {
      id: 'node-hostel-1',
      name: 'Hostel 1 (Boys)',
      lat: 22.7225,
      lng: 75.8650,
      status: 'normal',
      type: 'hostel',
      metric: '🟢 Flow Steady (1,230 L/d)',
      details: 'Consumption baseline within 2% margin.',
    },
    {
      id: 'node-library',
      name: 'Central Library',
      lat: 22.7140,
      lng: 75.8535,
      status: 'normal',
      type: 'building',
      metric: '🟢 Paper Unit Active',
      details: '15.2kg paper waste collected and cataloged.',
    },
    {
      id: 'node-sports',
      name: 'Sports Complex',
      lat: 22.7180,
      lng: 75.8670,
      status: 'normal',
      type: 'building',
      metric: '🟢 Solar Auxiliary Active',
      details: 'Generating 45 kW clean solar energy.',
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamically import leaflet to prevent Next.js SSR errors
    import('leaflet').then((L) => {
      // Check if map instance already exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize Leaflet Map centered on Indore Campus
      const map = L.map(mapContainerRef.current!, {
        center: [22.7196, 75.8577],
        zoom: 14,
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

      // Add Telemetry Line Connections (Polylines)
      const lineCoords: [number, number][] = [
        [22.7260, 75.8510], // Block A
        [22.7245, 75.8540], // Block B
        [22.7210, 75.8565], // Canteen
        [22.7196, 75.8577], // Bin #42
        [22.7150, 75.8625], // Hostel 3
        [22.7140, 75.8535], // Library
        [22.7180, 75.8670], // Sports
        [22.7225, 75.8650], // Hostel 1
      ];

      L.polyline(lineCoords, {
        color: '#03E5B7',
        weight: 2,
        dashArray: '5, 8',
        opacity: 0.7,
      }).addTo(map);

      L.polyline([[22.7245, 75.8540], [22.7150, 75.8625]], {
        color: '#FF007A',
        weight: 2.5,
        opacity: 0.85,
      }).addTo(map);

      // Render GPS Markers for each node
      nodes.forEach((node) => {
        const isCritical = node.status === 'critical';
        const isAttention = node.status === 'attention';

        const color = isCritical ? '#FF007A' : isAttention ? '#FFC700' : '#03E5B7';
        const glowClass = isCritical ? 'glow-pink' : isAttention ? 'glow-gold' : 'glow-teal';
        const iconSymbol = node.type === 'bin' ? '🗑️' : node.type === 'hostel' ? '🏠' : node.type === 'lab' ? '⚡' : '🏛️';

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
            INDORE CAMPUS LIVE GPS TELEMETRY MAP
          </h3>
          <p className="text-[11px] text-[#03E5B7] font-bold">
            Real-time IoT sensors & AI status indicators pinned to exact GPS coordinates.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1 text-[#03E5B7] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#03E5B7]" /> Normal
          </span>
          <span className="flex items-center gap-1 text-[#FFC700] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FFC700]" /> Attention
          </span>
          <span className="flex items-center gap-1 text-[#FF007A] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" /> Anomaly
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
                  {selectedNode.type === 'bin' ? '🗑️' : selectedNode.type === 'hostel' ? '🏠' : selectedNode.type === 'lab' ? '⚡' : '🏛️'}
                </span>
                <h4 className="font-black text-white text-xs tracking-wider">{selectedNode.name}</h4>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
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
