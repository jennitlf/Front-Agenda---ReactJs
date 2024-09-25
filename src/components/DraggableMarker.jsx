import React, { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

const DraggableMarker = ({ position, onMarkerDragEnd }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: onMarkerDragEnd,
      }}
    >
      <Popup>
        Arraste o marcador para obter o endereço.
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
