# React Textfit

A React component that truncate text using a number of rows.

## Install

To install, run in a terminal&#x202f;:

```bash
# using npm
npm install --save playeurzero/react-textfit
# using yarn
yarn add playeurzero/react-textfit
```

### Install a specific version

```bash
# using npm
npm install --save playeurzero/react-textfit#v1.0.0
# using yarn
yarn add playeurzero/react-textfit#v1.0.0
```

## Usage

### Usage in TypeScript

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Textfit from 'react-textfit'

ReactDOM.render(
  (
    <Textfit text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere praesentium, doloremque repudiandae soluta voluptatem, molestiae laboriosam, enim eaque laborum repellat perspiciatis. Maxime, debitis commodi. Explicabo doloribus laboriosam corporis at eaque." />
  ),
  document.querySelector('.app')
)
```

### Usage in JavaScript

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import Textfit from 'react-textfit'

ReactDOM.render(
  (
    <Textfit text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere praesentium, doloremque repudiandae soluta voluptatem, molestiae laboriosam, enim eaque laborum repellat perspiciatis. Maxime, debitis commodi. Explicabo doloribus laboriosam corporis at eaque." />
  ),
  document.querySelector('.app')
)
```

## Description

### \<Textfit> props

#### text

`string`

The text that should be fitted.

#### rows

`number?` = `3`

The number of rows before the text will be truncated.

#### expanded

`boolean?`

Indicates if the text should be truncated.
If set to true, the entire text will be shown.
If set to false, the text will be truncated if needed.

#### fallbackText

`string?` = `"..."`

The text to append to `text` if the content overflows the number of `lines`.

#### renderFallback

`React.ReactElement<any>?` = `<span />`

A component to append in case where the text overflows.
`fallbackText` is automatically added as prop `children` of `renderFallback`, so you should not put any children on this component.

## License

[MIT licensed](LICENSE)
