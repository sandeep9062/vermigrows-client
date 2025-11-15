"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with webpack


interface MapProps {
  setLocation?: (location: { lat: number; lng: number }) => void;
  location?: { lat: number; lng: number };
}

const Map = ({ setLocation, location }: MapProps) => {
  const [position, setPosition] = useState<[number, number]>(
    location && location.lat && location.lng
      ? [location.lat, location.lng]
      : [28.6139, 77.209]
  );

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (setLocation) {
          const { lat, lng } = e.latlng;
          setPosition([lat, lng]);
          setLocation({ lat, lng });
        }
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={position}
        icon={
          new L.Icon({
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      ></Marker>
      <MapEvents />
    </MapContainer>
  );
};

export default Map;
