import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DraggableMarker from './DraggableMarker';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ onAddress, initialPosition, setInitialPosition }) => {
  const [position, setPosition] = useState([initialPosition.lat, initialPosition.lng]);

  useEffect(() => {
    setPosition([initialPosition.lat, initialPosition.lng]);
  }, [initialPosition]);

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();
    return data.display_name;
  };

  const onMarkerDragEnd = async (event) => {
    const marker = event.target;
    const { lat, lng } = marker.getLatLng();
    setInitialPosition({ lat, lng });

    const returnedAddress = await fetchAddress(lat, lng);
    const addressfull = cutWords(returnedAddress);
    onAddress({ lat, lng, address: addressfull });
  };

  function cutWords(returnedAddress) {
    const phrase = returnedAddress.split(",", 3);
    return phrase.join(",");
  }

  return (
    <MapContainer center={position} zoom={15} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DraggableMarker position={position} onMarkerDragEnd={onMarkerDragEnd} /> {/* Usando o novo componente */}
    </MapContainer>
  );
};

export default Map;
