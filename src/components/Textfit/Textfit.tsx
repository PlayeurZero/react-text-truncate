import * as React from 'react'

import { getFitText, getLineHeight, throttle } from '../../libraries/utils'
let ReactSpring

interface IProps {
  text: string
  rows?: number
  renderFallback?: React.ReactElement<any>
  fallbackText?: string
  expanded?: boolean
}

interface IState {
  text: string
  previousText: string
}

class Textfit extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    rows: 3,
    fallbackText: '...',
    renderFallback: <span />,
    expanded: false,
  }

  private lineHeight: number = null
  private $nodes: any = {}

  constructor(props) {
    super(props)

    import('react-spring').then((localReactSpring) => {
      ReactSpring = localReactSpring
    })

    this.state = {
      text: props.text,
      previousText: props.text,
    }

    this.$nodes = {
      wrapper: React.createRef(),
    }

    this.handleResize = throttle(this.handleResize.bind(this), 250)
  }

  public componentDidMount() {
    this.updateSize()

    window.addEventListener('resize', this.handleResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      if (nextProps.expanded) {
        this.setState({ text: nextProps.text, previousText: this.state.text })
      } else {
        this.updateSize(false)
      }
    }
  }

  public handleResize() {
    this.updateSize()
  }

  public updateSize(expanded = this.props.expanded) {
    if (null == this.lineHeight) {
      this.lineHeight = getLineHeight(this.$nodes.wrapper.current)
    }

    // when testing, this.$nodes.wrapper can be undefined
    if (null == this.lineHeight || null == this.$nodes.wrapper.current) {
      return
    }

    this.$nodes.wrapper.current.style.overflow = 'hidden'
    this.$nodes.wrapper.current.style.display = 'inline-block'

    const text = expanded
      ? this.props.text
      : getFitText(
        this.$nodes.wrapper.current,
        this.props.text,
        this.props.rows,
        this.lineHeight,
        this.props.fallbackText,
      )

    if (text.length !== this.props.text.length) {
      let previousText = ''

      if (text.length === (this.state.previousText || { length: 0 }).length) {
        previousText = this.state.previousText
      }

      this.setState({
        text,
        previousText,
      })
    }
  }

  public render() {
    const text = this.state.text

    return (
      <span ref={this.$nodes.wrapper}>
        {this.state.previousText}
        {' '}
        {ReactSpring
          ? (
            <ReactSpring.Transition
              keys={this.state.text.length !== this.props.text.length}
              from={{ transform: 'scaleY(0)' }}
              enter={{ transform: 'scaleY(1)' }}
              leave={{ transform: 'scaleY(0)' }}
            >
              {(styles) => (
                <div
                  style={{
                    ...styles,
                    overflow: 'hidden',
                    display: 'inline-block',
                    transformOrigin: 'top center',
                    verticalAlign: 'bottom',
                  }}
                >
                  {text.slice((this.state.previousText || { length: 0 }).length)}
                </div>
              )}
            </ReactSpring.Transition>
          )
          : text
        }
        {
          this.state.text.length !== this.props.text.length &&
          React.cloneElement(this.props.renderFallback, {}, this.props.fallbackText)
        }
      </span>
    )
  }
}

export { Textfit as default, IProps, IState }
