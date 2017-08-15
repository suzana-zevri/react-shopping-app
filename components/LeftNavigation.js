import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
const customStyle = { position: 'fixed'}

const LeftNavigation = () => (
  <Menu compact icon vertical inverted style={customStyle}>
    <Menu.Item as='a'>
      <Icon name='align center' />
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='mail' />
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='users' />
    </Menu.Item>
  </Menu>
)

export default LeftNavigation