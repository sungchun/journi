import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { useRef, useState, useEffect, } from 'react'

export const Map = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom}) => {
  
    useEffect(() => {
      if (map.current) return
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/sungchun/ckvv1k05k3j8214qnguku372z',
        center: [lng, lat],
        zoom: zoom
      })
    })
    
    useEffect(() => {
      if (!map.current) return
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
    
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
        )
}

export default Map