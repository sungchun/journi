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