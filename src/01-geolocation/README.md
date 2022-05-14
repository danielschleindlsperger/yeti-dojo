# Geolocation

## Topic

`React.useEffect`: How it works and when to use it.

## Provided

- A leaflet map component
- A "You are here" component that renders a marker at a specified position

## Tasks

### 1. "You are here"

Implement a custom React hook that queries the users current location, using the [Browser's GeoLocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation), and show a marker at that position using the provided `<YouAreHere />` component.

The API could look something like this:

```ts
const latLng = useGeoLocation()
```

#### Helpful links

- [Override geolocation in Google Chrome](https://developer.chrome.com/docs/devtools/device-mode/geolocation/)

### 2. "Would you like to be tracked? :)"

Add an optional "watch" parameter that enables watching the users geolocation.

The API could look something like this:

```ts
const latLng = useGeoLocation({ watch: true })
```

Tip: `window.navigator.geolocation.watchPosition` is not invoked with an initial value on its own.
Tip: What happens with the active watcher when the component is unmounted?

### 3. "I Believe I Can Fly"

Center the map on the users current position whenever it changes.

Tip: You can use `react-leaflet`s `useMap` hook to retrieve an instance of the leaflet map.
Tip: You can use leaflets `flyTo` method to move the map to a position.
