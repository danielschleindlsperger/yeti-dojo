# Battery

## Topic

`React.useEffect`: How it works and when to use it.

## Provided

- A `<BatteryIcon />` component that displays the charge level and a charging indicator

## Tasks

### 1. Display the charging status

Implement a custom React hook that queries the users battery status, using the [Browser's Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API), and show the charging level and status using the provided `<BatteryIcon />` component.

The API could look something like this:

```ts
const { isCharging, level } = useBattery()
```

Note: This API is marked as deprecated currently only supported in Chrome because of privacy concerns: https://blog.lukaszolejnik.com/battery-status-readout-as-a-privacy-risk/

### 2. "Keep it up-to-date"

Watch the battery status for updates.

Tip: You can attach events to the `BatteryManager` instance using `addEventListener`
Tip: What happens with the active watcher when the component is unmounted?
