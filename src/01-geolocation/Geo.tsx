import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type GeoLocation = [number, number]

const WATZMANN: GeoLocation = [47.5518805, 12.9170687]

function useGeoLocation({ watch = false }: { watch?: boolean } = {}) {
  const [geo, setGeo] = React.useState<GeoLocation | undefined>()

  React.useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((geo) => {
      const { latitude, longitude } = geo.coords
      setGeo([latitude, longitude])
    })

    if (watch) {
      const watchId = window.navigator.geolocation.watchPosition((geo) => {
        const { latitude, longitude } = geo.coords
        setGeo([latitude, longitude])
      })

      return window.navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  return geo
}

export const Geo = withMap(() => {
  const geo = useGeoLocation({ watch: true })
  console.log({ geo })
  const map = useMap()

  React.useEffect(() => {
    console.log({ map })
    if (geo) map.flyTo(geo, 15)
  }, [geo])

  return geo ? <YouAreHere position={geo} /> : null
})

function YouAreHere({ position }: { position: GeoLocation }) {
  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function withMap<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
  const ComponentWithTheme = (props: Omit<T, keyof T>) => {
    return (
      <MapContainer center={WATZMANN} zoom={8} scrollWheelZoom={true} className="h-screen w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <WrappedComponent {...(props as T)} />
      </MapContainer>
    )
  }
  ComponentWithTheme.displayName = `withMap(${displayName})`
  return ComponentWithTheme
}
