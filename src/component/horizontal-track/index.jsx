import React from 'react'

import { KEY_CODE } from '../../constant/keydown'

import './index.scss'

const CARD_WIDTH = 200
const CARD_BORDER_MARGIN_RIGHT = 20
const FULL_HD = 1920

export default class HorizontalTrack extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, true)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, true)
  }

  onKeyDown = event => {
    const { isActive } = this.props

    if (!isActive) return

    switch (event.keyCode) {
      case KEY_CODE.RIGHT:
        this.moveRight()
        break

      case KEY_CODE.LEFT:
        this.moveLeft()
        break

      default:
        break
    }
  }

  moveRight = () => {
    const { items } = this.props
    const itemsLength = items.length - 1
    this.setState(prevState => {
      return {
        activeIndex: Math.min(itemsLength, prevState.activeIndex + 1)
      }
    })
  }

  moveLeft = () => this.setState(prevState => {
    const { onLeaveFirstItem } = this.props

    if (!prevState.activeIndex && onLeaveFirstItem) {
      onLeaveFirstItem()
      return
    }

    return {
      activeIndex: Math.max(0, prevState.activeIndex - 1)
    }
  })

  isFullHD = () =>  window.innerWidth >= FULL_HD

  getValueInFullHD= value => value * 1.5

  getCardContainerInlineStyle = () => {
    const { activeIndex } = this.state

    const cardWidth = this.isFullHD() ? this.getValueInFullHD(CARD_WIDTH) : CARD_WIDTH
    const cardBorderWidth = this.isFullHD() ? this.getValueInFullHD(CARD_BORDER_MARGIN_RIGHT) : CARD_BORDER_MARGIN_RIGHT

    const totalWidthToMove = activeIndex * (cardWidth + cardBorderWidth)

    return {
      marginLeft: -totalWidthToMove
    }
  }

  render() {
    const {
      isActive,
      items,
      title
    } = this.props

    return (
      <div className="horizontal-track">
        <p className="horizontal-track__title">{title}</p>
        <div className={`horizontal-track__card horizontal-track__card--border
          ${isActive ? 'horizontal-track__card--focused' : ''}`
        }
        >
        </div>
        <div className="horizontal-track__container"
          style={this.getCardContainerInlineStyle()}
        >
          {items.map((item, index) =>
            <div className={`horizontal-track__card `} key={index}>
              <img className="horizontal-track__img" src={item.img} alt={item.alt} />
            </div>
          )
          }
        </div>
      </div>
    )
  }
}