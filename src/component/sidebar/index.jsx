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
      menuItems
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
        this.props.onLeaveMenu()
        break
      default:
        break
    }
  }

  setActiveMenuIndex = index => this.setState({ activeMenuIndex: index })

  getMenuClass = index => {
    const { isActive } = this.props
    const { activeMenuIndex } = this.state

    return isActive && activeMenuIndex === index
      ? 'sidebar__item--focused'
      : ''
  }

  render() {
    const { menuItems } = this.props

    return (
      <ul className="sidebar">
        {
          menuItems.map((item, index) =>
            <li className={`sidebar__item ${this.getMenuClass(index)}`}
              key={index}>
              {item.label}
            </li>
          )
        }
      </ul>
    )
  }
}