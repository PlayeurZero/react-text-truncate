import * as React from 'react'

import { getFitText, getLineHeight, throttle } from '../../libraries/utils'

interface IProps {
  text: string
  lines?: number
  fallbackText?: string
}

interface IState {}

class Textfit extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    lines: 3,
    fallbackText: '...',
  }

  public lineHeight: number = null
  public $nodes: any = {}

  constructor(props) {
    super(props)

    this.$nodes = {
      wrapper: React.createRef(),
    }

    this.handleResize = throttle(this.handleResize.bind(this), 250)
  }

  public componentDidMount() {
    this.update()

    window.addEventListener('resize', this.handleResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  public handleResize() {
    this.forceUpdate()
  }

  public componentDidUpdate() {
    this.update()
  }

  public update() {
    if (null == this.lineHeight) {
      this.lineHeight = getLineHeight(this.$nodes.wrapper.current)
    }

    this.$nodes.wrapper.current.innerText = this.props.text

    this.$nodes.wrapper.current.style.overflow = 'hidden'
    this.$nodes.wrapper.current.style.display = 'inline-block'

    this.$nodes.wrapper.current.style.maxHeight = null
    const fitText = getFitText(this.$nodes.wrapper.current, this.props.lines, this.lineHeight)
    this.$nodes.wrapper.current.style.maxHeight = `${this.lineHeight * this.props.lines}px`

    if (fitText.length === this.props.text.length) {
      this.$nodes.wrapper.current.innerText = fitText
    } else {
      this.$nodes.wrapper.current.innerHTML = `${fitText}${this.props.fallbackText}`
    }
  }

  public render() {
    return (
      <span ref={this.$nodes.wrapper} />
    )
  }
}

export { Textfit as default, IProps, IState }
