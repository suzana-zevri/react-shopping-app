import React from 'react'
import { Icon, Label, Menu, Divider } from 'semantic-ui-react'
const customStyle = { position: 'fixed', zIndex: 2000}
import themes from '../constants/thems'


const RightNavigation = ({size}) => (
  <Menu icon vertical compact inverted style={customStyle}>
    <Divider hidden />
    <Menu.Item as='a' >
      <Icon name='cart'/>
      <Label color={thems.PRIMARY_COLOR} floating>{size}</Label>
    </Menu.Item>
  </Menu>
)

export default RightNavigation