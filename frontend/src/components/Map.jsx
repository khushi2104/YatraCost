import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';

const MapComponent = ({ source, destination }) => {
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current.leafletElement;
            if (source && destination) {
                map.fitBounds([source, destination]);
            }
        }
    }, [source, destination]);

    const PathFinder = () => {
        const map = useMap();
        if (source && destination) {
            return (
                <>
                    <Marker position={source}>
                        <Popup>{`Source: ${source}`}</Popup>
                    </Marker>
                    <Marker position={destination}>
                        <Popup>{`Destination: ${destination}`}</Popup>
                    </Marker>
                    <Polyline positions={[source, destination]} color="blue" />
                </>
            );
        } else {
            return null;
        }
    };

    return (
        <MapContainer center={[0, 0]} zoom={13} style={{ height: '400px', width: '100%' }} ref={mapRef}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <PathFinder />
        </MapContainer>
    );
};

export default MapComponent;
