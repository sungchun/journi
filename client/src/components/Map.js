import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { useRef, useState, useEffect, } from 'react'
import './Map.css'

export const Map = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom, flyLocation, flyZoom, geoJSON}) => {

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/sungchun/ckvv1k05k3j8214qnguku372z',
      center: [lng, lat],
      zoom: zoom
    })
  })

  useEffect(()=>{
    function fly(){
      map.current.flyTo({
        center: flyLocation,
        zoom: flyZoom,
        essential: true,
      })
    }
    fly()
  }, [flyLocation, zoom])
    
  useEffect(() => {
    if (!map.current) return
    setLng(map.current.getCenter().lng.toFixed(4))
    setLat(map.current.getCenter().lat.toFixed(4))
    setZoom(map.current.getZoom().toFixed(2))
  })

  // if(map.current){
  //   map.current.on('load', () => {
  //     map.current.loadImage(
  //       '../assets/map-marker.png',
  //       (error, image) => {
  //       if (error) throw error;
  //       map.current.addImage('custom-marker', image);
  //       // Add a GeoJSON source with 2 points
  //       map.current.addSource('points', geoJSON)
  //       // Add a symbol layer
  //       map.current.addLayer({
  //         'id': 'points',
  //         'type': 'symbol',
  //         'source': 'points',
  //         'layout': {
  //           'icon-image': 'custom-marker',
  //           // get the title name from the source's "title" property
  //           'text-field': ['get', 'title'],
  //           'text-font': [
  //           'Open Sans Semibold',
  //           'Arial Unicode MS Bold'
  //           ],
  //           'text-offset': [0, 1.25],
  //           'text-anchor': 'top'
  //         }
  //       })
  //       }
  //     )
  //     })
  // }


  return (
      <div>
          <div ref={mapContainer} className="map-container" />
      </div>
      )
}

export default Map