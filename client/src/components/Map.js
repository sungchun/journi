<<<<<<< HEAD
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { useRef, useState, useEffect, } from 'react'
import './Map.css'

const Map = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ'

    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(-70.7)
    const [lat, setLat] = useState(82.11)
    const [zoom, setZoom] = useState(9)

=======
import { useRef, useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VuZ2NodW4iLCJhIjoiY2t2djFnNjRuMDA0YTJvb2V3NWN3MG8xeCJ9.9wh2aRtP8nPesxW4bwjEIQ'


const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
>>>>>>> main

    useEffect(() => {
        if (map.current) return
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/sungchun/ckvv1k05k3j8214qnguku372z',
            center: [lng, lat],
            zoom: zoom
        })
<<<<<<< HEAD
        const newMarker = new mapboxgl.Marker().setLngLat([-122, 38]).addTo(map.current)
=======
>>>>>>> main
    })

    useEffect(() => {
        if (!map.current) return
<<<<<<< HEAD
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4))
            setLat(map.current.getCenter().lat.toFixed(4))
            setZoom(map.current.getZoom().toFixed(2))
        })
    })

    return (
        <div id='map'>
            <div ref={mapContainer} className="map-container"></div>
=======
        setLng(map.current.getCenter().lng.toFixed(4))
        setLat(map.current.getCenter().lat.toFixed(4))
        setZoom(map.current.getZoom().toFixed(2))
    })

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
>>>>>>> main
        </div>
    )
}

export default Map