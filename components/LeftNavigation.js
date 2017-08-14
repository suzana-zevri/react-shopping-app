import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

const LeftNavigation = () => (
  <Menu compact icon vertical inverted>
    <Menu.Item as='a'>
      Logo
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