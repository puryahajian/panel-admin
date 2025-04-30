import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import neshan_map_loader from "./neshan_map_loader";
import UseGetProfile from '../db/use-get-profile';

const Mapp = (props) => {
  const { style, options, onInit } = props;
  const mapEl = useRef(null);
  const markerRef = useRef(null);
  const { data } = UseGetProfile();

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



// const Mapp = () => {
//   const mapRef = useRef(null);
//   const [marker, setMarker] = useState(null);
//   const [coords, setCoords] = useState(null);

//   useEffect(() => {
//     if (!window.neshan) return;

//     const map = new window.neshan.Map({
//       container: mapRef.current,
//       apiKey: 'web.d64f30fcdbdb44768446e0e8e1368c85',
//       center: [51.3890, 35.6892],
//       zoom: 14,
//     });

//     let markerObj = null;

//     map.on('click', function (event) {
//       const { lng, lat } = event.coordinate;
//       console.log('Clicked at:', lat, lng);
//       setCoords({ lat, lng });

//       if (markerObj) {
//         markerObj.setPosition([lng, lat]);
//       } else {
//         markerObj = new window.neshan.Marker([lng, lat], null, {
//           name: 'مکان انتخاب‌شده',
//         });
//         map.addOverlay(markerObj);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
//       {coords && (
//         <div style={{ marginTop: '10px', direction: 'ltr' }}>
//           Selected Position: <strong>{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</strong>
//         </div>
//       )}
//     </div>
//   );
// };
// export default Mapp;


// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       console.log("Clicked Location:", lat, lng);
//       onMapClick(e.latlng);
//     },
//   });
//   return null;
// };

// const Mapp = () => {
//   const [selectedPosition, setSelectedPosition] = useState(null);

//   return (
//     <div style={{ height: "500px" }}>
//       <MapContainer
//         center={[35.6892, 51.3890]} // موقعیت اولیه تهران
//         zoom={18}
//         style={{ height: "100%", width: "100%" }}
//       >
//         {/* TileLayer از map.ir */}
//         <TileLayer
//           url="https://map.ir/vector/styles/satellite/mapir-xyz/{z}/{x}/{y}.png?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjliYjFkNGNmNGFlMGVlOTcxZDRjYTVkNWYyODQ0MjE4YTJhOGE5YmE2YjAzMWUxMTg2MzJmNWM5YzRkODlhZWJjODc2ZjdjNmZkMDU0MTNmIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6IjliYjFkNGNmNGFlMGVlOTcxZDRjYTVkNWYyODQ0MjE4YTJhOGE5YmE2YjAzMWUxMTg2MzJmNWM5YzRkODlhZWJjODc2ZjdjNmZkMDU0MTNmIiwiaWF0IjoxNzQ1OTI3NzQwLCJuYmYiOjE3NDU5Mjc3NDAsImV4cCI6MTc0NjEwMDU0MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.AZicmQV1NdqPSZttjmWQzQ8KGCbtc0pcaKD27Ju1mmIoVrRkCLcag6IGIDOOQExO0u2PL1vLQKzuWqUWRxg-60RHXupU2iLLYyX63yUk2VdPuxgQTGygBUK2f0tCkb4WCJn1VsPyacaMvq0-gJpYGM8yPppfzjw9KcRUcoZ1jx0uNb2ZYC7lihM5ndqBWFXb7A8dEbfrLBWCWJafODsilZbHhRHyd4mTHqoqHJ-X9ho7t3O1PoVzfJdpGcLEwJfO8AH_Qihd9_NiwXmcNA_udfEWjnZ7YstNjoiN4A66dNQHLS7a6ethfUBg9PSUkW-J29k2sxIyRRbkzXQ2mELgqg"
//           attribution='<a href="https://map.ir/">Map.ir</a>'
//         />
//         <MapClickHandler onMapClick={(latlng) => setSelectedPosition(latlng)} />
//         {selectedPosition && <Marker position={selectedPosition} />}
//       </MapContainer>

//       {selectedPosition && (
//         <div style={{ marginTop: "10px", direction: "ltr" }}>
//           Selected Position: <strong>{selectedPosition.lat.toFixed(5)}, {selectedPosition.lng.toFixed(5)}</strong>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Mapp;
// const Map = Mapir.setToken({
//     transformRequest: url => {
//         return {
//             url: url,
//             headers: {
//                 "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIiwiaWF0IjoxNzAyNzEyOTgzLCJuYmYiOjE3MDI3MTI5ODMsImV4cCI6MTcwNTIxODU4Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.tXjpRONMWv6udL8xhd9MMJruL99dJVei8xaZIYrfLMnUvcC5cUZ_vpIzqzjvXzbnMnUybt2Ou_2EJ-dX5WDxkurLamox4mNRu49ZUD5B_Ors8vMk_BVAMhLdS4jZZHB1SDQzvDTFvRjLDZqs4tiV3pPfc1zCpj3bkpMg30TrzpjJSdfaWEf3Px8mwVt3jw0ldEeVHNfu-mnGG7z-ZpMJgEgDIepRaiJ5T0ZwSP6QINrgg_TVj8k1DPi04CBGf4EB5L9QJUrvjZads2SWIi-qVRda0uYkocaSMa_mdfvH_Bz9biHgIH_1Sh1F1laQtq0HCt6R_VHb-H1A6wRhyiIc1A", //Mapir api key
//                 "Mapir-SDK": "reactjs"
//             }
//         };
//     }
// });

// const Mapp = () => {
//     const [markerArray, setMarkerArray] = useState([]);
//     const [coord, setCoord] = useState([51.42, 35.72]);
//     function reverseFunction(map, e) {
//       var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${
//         e.lngLat.lng
//       }`;
//       fetch(url, {
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIiwiaWF0IjoxNzAyNzEyOTgzLCJuYmYiOjE3MDI3MTI5ODMsImV4cCI6MTcwNTIxODU4Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.tXjpRONMWv6udL8xhd9MMJruL99dJVei8xaZIYrfLMnUvcC5cUZ_vpIzqzjvXzbnMnUybt2Ou_2EJ-dX5WDxkurLamox4mNRu49ZUD5B_Ors8vMk_BVAMhLdS4jZZHB1SDQzvDTFvRjLDZqs4tiV3pPfc1zCpj3bkpMg30TrzpjJSdfaWEf3Px8mwVt3jw0ldEeVHNfu-mnGG7z-ZpMJgEgDIepRaiJ5T0ZwSP6QINrgg_TVj8k1DPi04CBGf4EB5L9QJUrvjZads2SWIi-qVRda0uYkocaSMa_mdfvH_Bz9biHgIH_1Sh1F1laQtq0HCt6R_VHb-H1A6wRhyiIc1A"
//         }
//       })
//         .then(response => response.json())
//         .then(data => console.log(data));
//       const array = [];
//       array.push(
//         <Mapir.Marker
//           coordinates={[e.lngLat.lng, e.lngLat.lat]}
//           anchor="bottom"
//         />
//       );
//       setMarkerArray(array);
//     }
//     return (
//       <div className="App">
//         <Mapir center={coord} Map={Map} onClick={reverseFunction}>
//           {markerArray}
//         </Mapir>
//       </div>
//     );
// };

// export default Mapp;