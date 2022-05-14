import React, { SVGProps } from 'react'

export function Battery() {
  // YOUR CODE HERE

  return (
    <div className="h-screen p-16 flex justify-center items-center">
      <BatteryIcon charging={true} level={0.15} className="max-h-screen max-w-full w-96 h-96" />
    </div>
  )
}
type BatteryIconProps = SVGProps<SVGSVGElement> & {
  charging: boolean
  level: number
}
function BatteryIcon({ charging, level }: BatteryIconProps) {
  const height = 52
  const fillHeight = height * level
  const fillY = 6 + height - fillHeight
  const fillColor = level > 0.7 ? 'LimeGreen' : level > 0.2 ? 'DarkOrange' : 'Red'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
    >
      <rect fill={fillColor} x="16" y={fillY} width="28" height={fillHeight} />
      <path d="M42.536,4H36V0H24v4h-6.536C15.554,4,14,5.554,14,7.464v49.072C14,58.446,15.554,60,17.464,60h25.071   C44.446,60,46,58.446,46,56.536V7.464C46,5.554,44.446,4,42.536,4z M26,2h8v2h-8V2z M44,56.536C44,57.344,43.343,58,42.536,58   H17.464C16.657,58,16,57.344,16,56.536V7.464C16,6.656,16.657,6,17.464,6H24h12h6.536C43.343,6,44,6.656,44,7.464V56.536z" />
      {charging && (
        <path d="M34,17.108c0.021-0.423-0.212-0.822-0.605-1.007l-0.78-0.319l-0.494,0.61L21.204,34H27l0.002,12.884   c-0.022,0.412,0.201,0.813,0.58,1.003l0.795,0.351l0.506-0.636L38.653,29H34V17.108z M35.347,31l-6.345,12.105L29,32h-4.204   L32,20.372V31H35.347z" />
      )}
    </svg>
  )
}

declare global {
  interface Navigator {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
     * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery
     *
     * Optional, because it's available in Chrome, but not available in Firefox for now.
     */
    getBattery?: () => Promise<BatteryManager>
  }
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
 */
type BatteryManager = {
  /**
   * A Boolean value indicating whether the battery is currently being charged.
   */
  charging: boolean
  /**
   *A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
   */
  chargingTime: number
  /**
   * A number representing the remaining time in seconds until the battery is completely discharged and the system suspends.
   */
  dischargingTime: number
  /**
   * A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.
   */
  level: number

  addEventListener: (
    evt: 'levelchange' | 'chargingchange' | 'chargingtimechange' | 'dischargingtimechange',
    cb: (evt: BatteryEvent) => void,
  ) => void

  removeEventListener: (
    evt: 'levelchange' | 'chargingchange' | 'chargingtimechange' | 'dischargingtimechange',
    cb: (evt: BatteryEvent) => void,
  ) => void
}

type BatteryEvent = {
  target: BatteryManager
}
