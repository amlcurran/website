import React, {Component, CSSProperties} from "react"
import {number} from "prop-types"

interface ScrollFaderProps {
    enabled: boolean
}

interface Styled {
    style?: CSSProperties
}

interface ScrollFaderState {
    alpha: number
}

export class ScrollFader extends Component<ScrollFaderProps & Styled, ScrollFaderState> {
    private readonly selfReference: React.RefObject<HTMLDivElement>

    constructor(props: ScrollFaderProps & Styled) {
        super(props)
        this.state = { alpha: 1.0 }
        this.selfReference = React.createRef()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.didScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.didScroll.bind(this))
    }

    didScroll(event: Event) {
        // if (window.location.host === "localhost") {
        if (this.props.enabled) {
            let window = event.currentTarget as Window
            const topPosition = this.selfReference.current?.getBoundingClientRect().top || 1000
            const bottomPosition = this.selfReference.current?.getBoundingClientRect().bottom || 1000
            const height = this.selfReference.current?.getBoundingClientRect().height || 1000
            const screenHeight = window.innerHeight
            const endPosition = height
            if (bottomPosition < endPosition) {
                this.setState({alpha: Math.min((bottomPosition / endPosition), 1)})
            } else if (topPosition > screenHeight - endPosition) {
                let foo = Math.abs(topPosition - screenHeight) / endPosition
                const alpha = Math.min(1, foo)
                this.setState({alpha: Math.max(alpha, 0)})
            } else {
                this.setState({alpha: 1})
            }
        }
    }

    render() {
        return (
            <div style={{...this.props.style, opacity: this.state.alpha}}
                 ref={this.selfReference}>
                {this.props.children}
            </div>
        )

    }
}