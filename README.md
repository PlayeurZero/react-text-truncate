# React TextTruncate

A React component that truncate text using a number of rows.

## Install

To install, run in a terminal&#x202f;:

```bash
npm install --save playeurzero/react-text-truncate
```

### Install a specific version

```bash
npm install --save playeurzero/react-text-truncate#v1.0.0
```

## Demonstration

```bash
npm run storybook:run
```

Then open http://localhost:8000 in your favorite browser.

## Usage

### Usage in TypeScript

```tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import TextTruncate from 'react-text-truncate'

ReactDOM.render(
  (
    <TextTruncate text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere praesentium, doloremque repudiandae soluta voluptatem, molestiae laboriosam, enim eaque laborum repellat perspiciatis. Maxime, debitis commodi. Explicabo doloribus laboriosam corporis at eaque." />
  ),
  document.querySelector('.app')
)
```

### Usage in JavaScript

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import TextTruncate from 'react-text-truncate'

ReactDOM.render(
  (
    <TextTruncate text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere praesentium, doloremque repudiandae soluta voluptatem, molestiae laboriosam, enim eaque laborum repellat perspiciatis. Maxime, debitis commodi. Explicabo doloribus laboriosam corporis at eaque." />
  ),
  document.querySelector('.app')
)
```

## Description

### \<TextTruncate> props

#### text

`string`

The text that should be fitted.

#### rows

`number?` = `3`

The number of rows before the text will be truncated.

## License

[MIT licensed](LICENSE)
