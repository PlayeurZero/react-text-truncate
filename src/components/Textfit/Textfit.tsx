import * as React from 'react'

import { getFitText, getLineHeight, throttle } from '../../libraries/utils'

interface IProps {
  text: string
  rows?: number
  renderFallback?: React.ReactElement<any>
  fallbackText?: string
}

interface IState {
  text: string
}

class Textfit extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    rows: 3,
    fallbackText: '...',
    renderFallback: <span />,
  }

  public lineHeight: number = null
  public $nodes: any = {}

  constructor(props) {
    super(props)

    this.state = {
      text: props.text,
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

  public handleResize() {
    this.updateSize()
  }

  public updateSize() {
    if (null == this.lineHeight) {
      this.lineHeight = getLineHeight(this.$nodes.wrapper.current)
    }

    this.$nodes.wrapper.current.style.overflow = 'hidden'
    this.$nodes.wrapper.current.style.display = 'inline-block'

    const text = getFitText(
      this.$nodes.wrapper.current,
      this.props.text,
      this.props.rows,
      this.lineHeight,
      this.props.fallbackText,
    )

    if (text.length !== this.props.text.length) {
      this.setState({
        text,
      })
    }
  }

  public renderFallback() {
    if (this.state.text.length !== this.props.text.length) {
      return React.cloneElement(this.props.renderFallback, {}, this.props.fallbackText)
    }
  }

  public render() {
    return (
      <span ref={this.$nodes.wrapper}>{this.state.text}{this.renderFallback()}</span>
    )
  }
}

export { Textfit as default, IProps, IState }
