import { render } from '@testing-library/react'
import { it, describe, expect } from 'vitest'
import { Geo } from './Geo'

describe('<Geo />', () => {
  it('renders', () => {
    const { container } = render(<Geo />)

    expect(container.tagName).toEqual('DIV')
  })
})
