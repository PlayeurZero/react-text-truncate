# React Textfit

A React component that fit text using a number of lines.

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
import * as Textfit from 'react-textfit'

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

#### lines

`number?` = `3`

The number of lines before the text will be truncated.

#### fallbackText

`string?` = `"..."`

The text to append to `text` if the content overflows the number of `lines`.

## License

[MIT licensed](LICENSE)
