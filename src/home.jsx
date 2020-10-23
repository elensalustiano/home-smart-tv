import React from 'react'

import HorizontalTrack from './component/horizontal-track'
import Sidebar from './component/sidebar'

import trackImage from './images/react.jpg'
import logoReact from './images/logo.svg'

const menuItems = [
  {
    label: 'Buscar',
    icon: logoReact,
    path: 'path'
  },
  {
    label: 'Inicio',
    icon: logoReact,
    path: 'path'
  },
  {
    label: 'Agora na TV',
    icon: logoReact,
    path: 'path'
  },
  {
    label: 'Categorias',
    icon: logoReact,
    path: 'path'
  },
  {
    label: 'Minha Conta',
    icon: logoReact,
    path: 'path'
  }
]

const ELEMENTS = {
  MENU: 'MENU',
  TRACK: 'TRACK'
}

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeElement: ELEMENTS.MENU
    }
  }

  getTrackItems = () => {
    const item = {
      img: trackImage,
      alt: 'alt'
    }
    return Array(10).fill(item)
  }

  setActiveElement = (activeElement) => this.setState({ activeElement })

  onLeaveTrack = () => this.setActiveElement(ELEMENTS.MENU)

  onLeaveMenu = () => this.setActiveElement(ELEMENTS.TRACK)

  render() {
    const { activeElement } = this.state
    const trackItems = this.getTrackItems()

    return (
      <div className="App">
        <Sidebar
          isActive={activeElement === ELEMENTS.MENU}
          menuItems={menuItems}
          onLeaveMenu={this.onLeaveMenu}
        />
        <HorizontalTrack
          isActive={activeElement === ELEMENTS.TRACK}
          items={trackItems}
          title={'NOVIDADES'}
          onLeaveFirstItem={this.onLeaveTrack}
        />
      </div>
    )
  }
}
