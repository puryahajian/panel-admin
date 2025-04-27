import React, { useState } from 'react'
import '../../App.css';
import Mapir from 'mapir-react-component';

const Map = Mapir.setToken({
    transformRequest: url => {
        return {
            url: url,
            headers: {
                "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIiwiaWF0IjoxNzAyNzEyOTgzLCJuYmYiOjE3MDI3MTI5ODMsImV4cCI6MTcwNTIxODU4Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.tXjpRONMWv6udL8xhd9MMJruL99dJVei8xaZIYrfLMnUvcC5cUZ_vpIzqzjvXzbnMnUybt2Ou_2EJ-dX5WDxkurLamox4mNRu49ZUD5B_Ors8vMk_BVAMhLdS4jZZHB1SDQzvDTFvRjLDZqs4tiV3pPfc1zCpj3bkpMg30TrzpjJSdfaWEf3Px8mwVt3jw0ldEeVHNfu-mnGG7z-ZpMJgEgDIepRaiJ5T0ZwSP6QINrgg_TVj8k1DPi04CBGf4EB5L9QJUrvjZads2SWIi-qVRda0uYkocaSMa_mdfvH_Bz9biHgIH_1Sh1F1laQtq0HCt6R_VHb-H1A6wRhyiIc1A", //Mapir api key
                "Mapir-SDK": "reactjs"
            }
        };
    }
});

const App = () => {
  const [markerArray, setMarkerArray] = useState([]);
  const [coord, setCoord] = useState([51.42, 35.72]);
  function reverseFunction(map, e) {
    var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${
      e.lngLat.lng
    }`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIn0.eyJhdWQiOiIyNTM1NiIsImp0aSI6ImVjZTU4MzEzNmE2MWVjMzNmYmZkMjU4ODg1NDIwZGU3NWY3N2IwM2Y0OTI1NjAwZjkxN2FjNTJiZGI5NDgyNDk1MDAxMjMzNjczOTcyMDZhIiwiaWF0IjoxNzAyNzEyOTgzLCJuYmYiOjE3MDI3MTI5ODMsImV4cCI6MTcwNTIxODU4Mywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.tXjpRONMWv6udL8xhd9MMJruL99dJVei8xaZIYrfLMnUvcC5cUZ_vpIzqzjvXzbnMnUybt2Ou_2EJ-dX5WDxkurLamox4mNRu49ZUD5B_Ors8vMk_BVAMhLdS4jZZHB1SDQzvDTFvRjLDZqs4tiV3pPfc1zCpj3bkpMg30TrzpjJSdfaWEf3Px8mwVt3jw0ldEeVHNfu-mnGG7z-ZpMJgEgDIepRaiJ5T0ZwSP6QINrgg_TVj8k1DPi04CBGf4EB5L9QJUrvjZads2SWIi-qVRda0uYkocaSMa_mdfvH_Bz9biHgIH_1Sh1F1laQtq0HCt6R_VHb-H1A6wRhyiIc1A"
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
    const array = [];
    array.push(
      <Mapir.Marker
        coordinates={[e.lngLat.lng, e.lngLat.lat]}
        anchor="bottom"
      />
    );
    setMarkerArray(array);
  }
  return (
    <div className="App">
      <Mapir center={coord} Map={Map} onClick={reverseFunction}>
        {markerArray}
      </Mapir>
    </div>
  );
};

export default App;
