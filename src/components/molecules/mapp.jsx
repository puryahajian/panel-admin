import React, { useEffect, useRef } from 'react';
import '../../App.css';
import neshan_map_loader from './neshan_map_loader';
import useGetInfo from '../db/use-get-info';
import PropTypes from 'prop-types';

const Mapp = ({ style, options, onInit, savedLat, savedLng, onMarkerChange, centerLat, centerLng, defaultStyle }) => {
  const mapEl = useRef(null);
  const markerRef = useRef(null);

  // Default coordinates with fallback values

  const mapCenterLat = centerLat || savedLat;
  const mapCenterLng = centerLng || savedLng;

  // const defaultStyle = {
  //   width: "100%",
  //   height: "472px",
  //   borderRadius: "8px",
  //   margin: 0,
  //   padding: 0,
  //   background: "#eee",
  // };

  const defaultOptions = {
    key: "web.d64f30fcdbdb44768446e0e8e1368c85",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [mapCenterLat, mapCenterLng],
    zoom: 16,
  };

  useEffect(() => {
    let map = null;

    neshan_map_loader({
      onLoad: () => {
        try {
          map = new window.L.Map(mapEl.current, { ...defaultOptions, ...options });

          // Initialize marker
          const initialPosition = savedLat && savedLng
            ? new window.L.LatLng(savedLat, savedLng)
            : new window.L.LatLng(mapCenterLat, mapCenterLng);
          const marker = window.L.marker(initialPosition).addTo(map);
          markerRef.current = marker;

          // Map click event handler
          map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            onMarkerChange( lat, lng );

            if (markerRef.current) {
              markerRef.current.setLatLng(e.latlng);
            } else {
              const newMarker = window.L.marker(e.latlng).addTo(map);
              markerRef.current = newMarker;
            }
          });

          if (onInit) {
            onInit(window.L, map);
          }
        } catch (error) {
          console.error("Map initialization failed:", error);
        }
      },
      onError: () => {
        console.error("Neshan Maps Error: Failed to load Neshan Maps");
      },
    });

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [options, onInit, mapCenterLat, mapCenterLng, savedLat, savedLng, onMarkerChange]);

  return <div ref={mapEl} style={{ ...defaultStyle, ...style }} />;
};

Mapp.propTypes = {
  style: PropTypes.object,
  options: PropTypes.object,
  onInit: PropTypes.func,
  savedLat: PropTypes.number,
  savedLng: PropTypes.number,
  onMarkerChange: PropTypes.func,
  centerLat: PropTypes.number,
  centerLng: PropTypes.number,
};

export default Mapp;