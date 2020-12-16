import React, { useEffect, useState, useRef, useContext } from "react";
import mapboxgl, { LngLat } from "mapbox-gl";
import MapContainer from "../elements/MapContainer";
import "../../style/marker.css";
import data from "../files/europeanCities.json";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q",
  dragPan: false,
  doubleClickZoom: false,
  touchZoomRotate: false,
  scrollZoom: false,
  dragRotate: false,
});

// const styles = {
//   // width: "80vw",
//   // height: "calc(100vh - 180px)",
//   width: "800px",
//   height: "800px",
//   // position: "absolute",
// };

let isPointSelected = false;
const roundNumber = 5;
let currentRound = 0;
let selectedCities = [];
let currentCity = null;

const Map = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  citySelector();

  // const cityArray = selectedCities;

  currentCity = selectedCities[currentRound];

  // useEffect(() => {
  //   // mapboxgl.accessToken =
  //   //   "pk.eyJ1Ijoia296bWFydGludXMiLCJhIjoiY2tpb2VwNW91MGh6bDJ6bWxkbzdlemUyeCJ9.JcDXIp8INuk9kw1H3BAt8Q";

  //   const initializeMap = ({ setMap, mapContainer }) => {
  //     const map = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       center: [15,55],
  //       zoom: 2.75,
  //     });

  //     map.on("load", () => {
  //       setMap(map);
  //       disableInteractives(map);

  //       map.on("click", (e) => {
  //         if (isPointSelected) {
  //           e.preventDefault();
  //         } else {
  //           mapClickHandler(e, map, currentCity);

  //         }
  //       });
  //       map.resize();
  //     });
  //   };

  //   if (!map) initializeMap({ setMap, mapContainer });
  // }, [map, currentCity]);

  return (
    <MapContainer>
      <p>{currentCity.city}</p>
      <MapBox
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: "680px",
          width: "800px",
        }}
        center={[15, 57]}
        zoom={[2.75]}
        onStyleLoad={(map, event) =>
          map.style.stylesheet.layers.forEach(function (layer) {
            if (layer.type === "symbol") {
              map.removeLayer(layer.id);
            }
          })
        }
      ></MapBox>
      ;
      <div>
        <button id="clearButton">Next City</button>
      </div>
    </MapContainer>
  );
};

function citySelector() {
  while (selectedCities.length < roundNumber) {
    let cityIndex = Math.floor(Math.random() * data.european_cities.length);
    let actualCity = data.european_cities[cityIndex];
    if (!selectedCities.includes(actualCity)) {
      selectedCities.push(actualCity);
    }
  }
}

function disableInteractives(map) {
  map.scrollZoom.disable();
  map.doubleClickZoom.disable();
  map.dragPan.disable();
  MapBox.style.stylesheet.layers.forEach(function (layer) {
    if (layer.type === "symbol") {
      map.removeLayer(layer.id);
    }
  });
}

const mapClickHandler = (e, map, currentCity) => {
  const city = new LngLat(currentCity.longitude, currentCity.latitude);
  let message = Math.round(city.distanceTo(e.lngLat) / 1000) + " km away.";
  let guessMarker = new mapboxgl.Marker()
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .addTo(map);
  let popup = new mapboxgl.Popup({ offset: 38 })
    .setLngLat(city)
    .setHTML(`<h3 class="popup">${message}</h3>`)
    .addTo(map);
  let cityMarker = new mapboxgl.Marker({ color: "green" })
    .setLngLat(city)
    .addTo(map);

  isPointSelected = true;

  document.querySelector("#clearButton").addEventListener("click", function () {
    currentRound++;
    currentCity = selectedCities[currentRound];
    guessMarker.remove();
    cityMarker.remove();
    popup.remove();
    isPointSelected = false;
  });
};

export default Map;
