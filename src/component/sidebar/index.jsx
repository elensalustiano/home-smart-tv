import React from 'react'

import { KEY_CODE } from '../../constant/keydown'

import './index.scss'

export default class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeMenuIndex: 0
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, true)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, true)
  }

  onKeyDown = event => {
    const {
      isActive,
      menuItems,
      onLeaveMenu
    } = this.props

    if (!isActive) return

    const { activeMenuIndex } = this.state
    const { keyCode } = event

    switch (keyCode) {
      case KEY_CODE.DOWN:
        const index = Math.min(menuItems.length - 1, activeMenuIndex + 1)
        this.setActiveMenuIndex(index)
        break

      case KEY_CODE.UP:
        this.setActiveMenuIndex(Math.max(0, activeMenuIndex - 1))
        break

      case KEY_CODE.RIGHT:
        onLeaveMenu()
        event.stopImmediatePropagation()
        break
      default:
        break
    }
  }

  setActiveMenuIndex = index => this.setState({ activeMenuIndex: index })

  getItemClass = index => this.state.activeMenuIndex === index ? 'focused' : ''

  getSidebarClass = () => this.props.isActive ? '' : 'sidebar--closed'

  render() {
    const { isActive, menuItems } = this.props

    return (
      <ul className={`sidebar ${this.getSidebarClass()}`}>
        {
          menuItems.map((item, index) => {
            const itemClass = this.getItemClass(index)

            return (
              <div className={`sidebar__item ${itemClass}`}>
                <img className="sidebar__icon" src={item.icon} alt={item.alt} />
                {isActive &&
                  <li className={`sidebar__label ${itemClass}`}
                    key={index}>
                    {item.label}
                  </li>
                }
              </div>
            )
          })
        }
      </ul>
    )
  }
}