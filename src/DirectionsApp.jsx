import React, { useState, useRef, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.7749, // Default center coordinates (San Francisco)
  lng: -122.4194,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const DirectionsApp = () => {
  const [sourceLng, setSourceLng] = useState(null);
  const [sourceLat, setSourceLat] = useState(null);
  const [destinationLng, setDestinationLng] = useState(null);
  const [destinationLat, setDestinationLat] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      directionsService.current = new DirectionsService();
      directionsRenderer.current = new DirectionsRenderer({ map: mapRef.current });
    }
  }, [mapRef.current]);

  const calculateDirections = () => {
    if (!sourceLng || !sourceLat || !destinationLng || !destinationLat) {
      console.error('Please enter source and destination coordinates.');
      return;
    }

    const origin = new window.google.maps.LatLng(sourceLat, sourceLng);
    const destination = new window.google.maps.LatLng(destinationLat, destinationLng);

    const request = {
      origin,
      destination,
      travelMode,
    };

    directionsService.current.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionsResponse(result);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  };

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey={"test"} // Replace with your API key
    >
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        {mapRef.current && directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        {sourceLng && sourceLat && (
          <Marker position={{ lat: sourceLat, lng: sourceLng }} label="Source" />
        )}
        {destinationLng && destinationLat && (
          <Marker position={{ lat: destinationLat, lng: destinationLng }} label="Destination" />
        )}

        <div className="input-fields">
          {/* Input fields for source and destination coordinates, travel mode, and calculate button */}
        </div>
      </GoogleMap>
    </LoadScript>
  );
};

export default DirectionsApp;
