import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type GeoLocation = [number, number]

const WATZMANN: GeoLocation = [47.5518805, 12.9170687]

export const Geo = withMap(() => {
  // YOUR CODE HERE
  return <YouAreHere position={WATZMANN} />
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
