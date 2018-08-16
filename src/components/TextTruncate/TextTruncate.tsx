import * as React from 'react'

// libraries
import { previousSibling, throttle, classConcat, getFirstDefinedVar } from '../../libraries/utils'

interface IProps {
  text: string
  rows?: number
  ellipsis?: string
  clamped?: boolean
  renderTruncated?: () => React.ReactElement<any>
  renderEllipsis?: () => React.ReactElement<any>
}

interface IState {
  clamped: boolean
  ellipsisIndex: number
}

import * as classes from './styles.css'

/**
 * Inspired by https://github.com/xiaody/react-lines-ellipsis
 */
class TextTruncate extends React.Component<IProps, IState> {
  public static readonly defaultProps = {
    ellipsis: '…',
    rows: 3,
    renderTruncated: () => <span />,
    renderEllipsis: () => <span />,
  }

  private static readonly propsToCopy = [
    'box-sizing',
    'width',
    'font-size',
    'font-weight',
    'font-family',
    'font-style',
    'letter-spacing',
    'text-indent',
    'white-space',
    'word-break',
    'padding-left',
    'padding-right',
  ]

  private canvas = null
  private $nodes = {
    text: React.createRef<HTMLDivElement>(),
  }
  private units = []

  public constructor(props) {
    super(props)

    this.state = {
      clamped: false,
      ellipsisIndex: null,
    }

    this.handleResize = throttle(this.handleResize.bind(this), 150)
  }

  public componentDidMount() {
    this.initCanvas()

    this.update()

    window.addEventListener('resize', this.handleResize)
  }

  public componentWillUnmount() {
    this.canvas.parentNode.removeChild(this.canvas)

    window.removeEventListener('resize', this.handleResize)
  }

  private handleResize() {
    this.copyStyleToCanvas()
    this.update()
  }

  private initCanvas() {
    /** Canvas already created, skip this step */
    if (this.canvas) {
      return
    }

    const canvas = this.canvas = document.createElement('div')
    canvas.setAttribute('aria-hidden', 'true')

    this.copyStyleToCanvas()
    canvas.setAttribute('class', classes['TextTruncate-canvas'])

    document.body.appendChild(canvas)
  }

  private copyStyleToCanvas() {
    const computedStyle = window.getComputedStyle(this.$nodes.text.current)

    TextTruncate.propsToCopy.forEach((key) => {
      this.canvas.style[key] = computedStyle[key]
    })
  }

  private update() {
    const units = this.props.text.split(/\b|(?=\W)/)
    this.units = units

    this.canvas.innerHTML = units.map((unit) => {
      return `<span>${unit}</span>`
    }).join('')

    const { ellipsisIndex, clamped } = this.computeClamp(units)

    this.setState({
      clamped,
      ellipsisIndex,
    })
  }

  private calcIndexes() {
    const indexes = [0]

    let el = this.canvas.firstElementChild
    if (!el) {
      return indexes
    }

    let index = 0
    let line = 1
    let offsetTop = el.offsetTop

    while (el.nextElementSibling) {
      el = el.nextElementSibling

      if (el.offsetTop > offsetTop) {
        line++
        indexes.push(index)
        offsetTop = el.offsetTop
      }

      index++

      if (line > this.props.rows) {
        break
      }
    }

    return indexes
  }

  private computeClamp(units) {
    const indexes = this.calcIndexes()

    if (indexes.length <= this.props.rows) {
      return {
        ellipsisIndex: -1,
        clamped: false,
      }
    }

    const lastIndex = indexes[this.props.rows]
    const localUnits = units.slice(0, lastIndex)
    const maxOffsetTop = this.canvas.children[lastIndex].offsetTop

    this.canvas.innerHTML =
      `${localUnits.map((localUnit) => `<span>${localUnit}</span>`).join('')}<wbr><span>${this.props.ellipsis}</span>`

    const $ellipsis = this.canvas.lastElementChild
    let $previousUnit = previousSibling($ellipsis, 2)
    while ($previousUnit && (
      $ellipsis.offsetTop > maxOffsetTop ||
      $ellipsis.offsetHeight > $previousUnit.offsetHeight ||
      $ellipsis.offsetTop > $previousUnit.offsetTop
    )) {
      this.canvas.removeChild($previousUnit)
      $previousUnit = previousSibling($ellipsis, 2)
      localUnits.pop()
    }

    return {
      ellipsisIndex: localUnits.length,
      clamped: true,
    }
  }

  private isClamped() {
    return getFirstDefinedVar(this.props.clamped && this.state.clamped, this.state.clamped)
  }

  public render() {
    const isClamped = this.isClamped()

    return (
      <div
        ref={this.$nodes.text}
        className={classConcat({ [classes['TextTruncate--clamped']]: isClamped })}
      >
        <span className={classes['TextTruncate-base']}>
          {this.units.slice(0, this.state.ellipsisIndex).join('')}
        </span>

        <wbr />
        {isClamped && (
          React.cloneElement(this.props.renderEllipsis(), {}, this.props.ellipsis)
        )}

        <span className={classes['TextTruncate-truncated']}>
          {React.cloneElement(this.props.renderTruncated(), {}, this.units.slice(this.state.ellipsisIndex).join(''))}
        </span>
      </div>
    )
  }
}

export { TextTruncate as default, IProps, IState }
