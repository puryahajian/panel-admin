import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import neshan_map_loader from "./neshan_map_loader";
import UseGetProfileDoctor from '../db/use-get-profile-doctor';

const Mapp = (props) => {
  const { style, options, onInit } = props;
  const mapEl = useRef(null);
  const markerRef = useRef(null);
  const { data } = UseGetProfileDoctor();

  // خواندن موقعیت آخرین مارکر از localStorage (اگر وجود داشته باشد)
  const savedLat = parseFloat(localStorage.getItem('lat'));
  const savedLng = parseFloat(localStorage.getItem('lng'));

  // مختصات پیش‌فرض در صورت عدم وجود داده در localStorage
  const defaultLat = data?.location_lat || 35.699739;
  const defaultLng = data?.location_lng || 51.338097;

  // موقعیت مرکز نقشه و مارکر
  const centerLat = savedLat || defaultLat;
  const centerLng = savedLng || defaultLng;

  const defaultStyle = {
    width: "100%",
    height: "395px",
    margin: 0,
    padding: 0,
    background: "#eee",
  };

  const defaultOptions = {
    key: "web.d64f30fcdbdb44768446e0e8e1368c85",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [centerLat, centerLng],
    zoom: 16,
  };

  useEffect(() => {
    neshan_map_loader({
      onLoad: () => {
        let map = new window.L.Map(mapEl.current, { ...defaultOptions, ...options });

        // قرار دادن مارکر در موقعیت مرکز نقشه
        if (savedLat && savedLng) {
          const savedPosition = new window.L.LatLng(savedLat, savedLng);
          const marker = window.L.marker(savedPosition).addTo(map);
          markerRef.current = marker;
        } else {
          const defaultPosition = new window.L.LatLng(centerLat, centerLng);
          const marker = window.L.marker(defaultPosition).addTo(map);
          markerRef.current = marker;
        }

        // رویداد کلیک روی نقشه
        map?.on('click', (e) => {
          const latlng = e.latlng;
          console.log('Clicked location:', latlng);
          localStorage.setItem('lat', latlng.lat.toFixed(9));
          localStorage.setItem('lng', latlng.lng.toFixed(9));

          if (markerRef?.current) {
            markerRef?.current?.setLatLng(latlng);
          } else {
            const marker = window.L.marker(latlng).addTo(map);
            markerRef.current = marker;
          }
        });

        if (onInit) onInit(window?.L, map);
      },
      onError: () => {
        console.error("Neshan Maps Error: This page didn't load Neshan Maps correctly");
      },
    });
  }, [options, onInit, centerLat, centerLng]); // Dependency updated

  return <div ref={mapEl} style={{ ...defaultStyle, ...style }} />;
};

export default Mapp;