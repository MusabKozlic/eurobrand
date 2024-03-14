import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '380px',
  height: '300px'
};

const defaultCenter = { lat: 44.199, lng: 17.911 };
const defaultMarkerPosition = { lat: 44.199, lng: 17.911 }; // Coordinates for your desired address

function MyMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDWWSG9lFJbth_OfrZHNZEephoFyYYJu8Y">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={14}
        options={{
          styles: [
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            },
            {
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161'
                }
              ]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f5f5f5'
                }
              ]
            }
          ]
        }}
      >
        <Marker position={defaultMarkerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MyMap;
