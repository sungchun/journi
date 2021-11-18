import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { useRef, useState, useEffect, } from 'react'
import './Map.css'

export const Map = ({map, mapContainer, setLng, setLat, setZoom, lat, lng, zoom, flyLocation, flyZoom, geoJSON}) => {

  useEffect(() => {
    if (map.current) return
    if(geoJSON.data.features.length < 1) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/sungchun/ckvv1k05k3j8214qnguku372z',
      center: [lng, lat],
      zoom: zoom
    })
      map.current.on('load', () => {
        map.current.loadImage('https://res.cloudinary.com/reisli82/image/upload/v1637233779/journi/Marker-128_copy_igdckb.png', (error, image) => {
          if (error){
            console.log(error)
            throw error
          } 
          map.current.addImage('custom-marker', image)
          map.current.addSource('points', geoJSON)
          map.current.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'custom-marker',
              'text-field': ['get', 'title'],
              'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          })
          }
        )
        })
    }, [geoJSON])
  
  
  useEffect(() => {
    if (!map.current) return
    setLng(map.current.getCenter().lng.toFixed(4))
    setLat(map.current.getCenter().lat.toFixed(4))
    setZoom(map.current.getZoom().toFixed(2))
  })

  useEffect(()=>{
    function fly(){
      if(!map.current) return
      map.current.flyTo({
        center: flyLocation,
        zoom: flyZoom,
        essential: true,
      })
    }
    fly()
  }, [flyLocation, zoom])

  return (
    <>
    {geoJSON.data.features.length ? (<div>
      <div ref={mapContainer} className="map-container" />
  </div>):(<></>)
  }
      </>
  )
}

export default Map