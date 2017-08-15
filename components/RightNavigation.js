import React from 'react'
import { Icon, Label, Menu, Divider } from 'semantic-ui-react'

const RightNavigation = ({size}) => (
  <Menu icon vertical compact inverted style={{ position: 'fixed', zIndex: 2000}}>
    <Divider hidden />
    <Menu.Item as='a' >
      <Icon name='cart'/>
      <Label color='pink' floating>{size}</Label>
    </Menu.Item>
  </Menu>
)

export default RightNavigation