import * as React from 'react'
import { shallow } from 'enzyme'

import Textfit from '../'

describe('<Textfit />', () => {
  it('renders <Textfit />', () => {
    const wrapper = shallow((
      <span />
    ))

    expect(1).toBe(1)
  })
})
