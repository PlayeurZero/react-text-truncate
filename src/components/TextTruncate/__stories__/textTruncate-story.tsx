import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import TextTruncate from '../'

storiesOf('Data display/TextTruncate', module).add('basic usage', () => {
  return (
    <TextTruncate
      text={
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
        'Sit sunt voluptates obcaecati! Ipsam soluta nam totam doloremque id neque, ' +
        'ipsum architecto, aut, quisquam eaque enim consequatur asperiores voluptates esse sunt? ' +
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
        'Sit sunt voluptates obcaecati! Ipsam soluta nam totam doloremque id neque, ' +
        'ipsum architecto, aut, quisquam eaque enim consequatur asperiores voluptates esse sunt? ' +
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sunt voluptates obcaecati! ' +
        'Ipsam soluta nam totam doloremque id neque, ipsum architecto, aut, quisquam eaque enim ' +
        'consequatur asperiores voluptates esse sunt? Lorem ipsum dolor sit amet consectetur ' +
        'adipisicing elit. Sit sunt voluptates obcaecati! Ipsam soluta nam totam doloremque id neque, ' +
        'ipsum architecto, aut, quisquam eaque enim consequatur asperiores voluptates esse sunt?'
      }
      rows={5}
      clamped={boolean('clamped', false)}
    />
  )
})
