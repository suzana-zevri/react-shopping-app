import React from 'react'
import { Icon, Label, Menu } from 'semantic-ui-react'

const RightNavigation = ({size}) => (
  <Menu icon='labeled' vertical inverted>
    <br/>
    <Menu.Item as='a'>
      <Icon name='cart' />
      Dresses
      <Label color='pink' floating>{size}</Label>
    </Menu.Item>
  </Menu>
)

export default RightNavigation