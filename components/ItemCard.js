import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { viewItem, removeItem, saveItem } from '../reducers/main'
import { Card, Icon, Image, Button } from 'semantic-ui-react'

export class ItemCard extends Component {

  state = { currentImage: this.props.item.thumbnails[1] }


  handleMouseOver = () => {
     let currentImage = this.props.item.thumbnails[0]
     this.setState({currentImage})
  }

  handleMouseOut = () => {
     let currentImage = this.props.item.thumbnails[1]
     this.setState({currentImage})
  }

  handleClickView = () => {
    const id = this.props.item.id
    this.props.viewItem(id)
  }

  handleClickRemove = () => {
    const id = this.props.item.id
    this.props.removeItem(id)
  }

  handleClickSave = () => {
    const id = this.props.item.id
    this.props.saveItem(id)
  }
  
  render () {
    const item = this.props.item

    let itemAction = null
    if (item.saved) {
      itemAction = <a onClick={this.handleClickRemove}>
        <Button basic color='red'>Remove</Button>
      </a>
    } else {
      itemAction = <a onClick={this.handleClickSave}><Button basic color='blue'>Save</Button></a>
    }

    return (
      <Card>
        {this.props.itemSelected}
        <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <Image src={this.state.currentImage} />
        </div>
        <Card.Content>
          <Card.Header> {item.name} </Card.Header>
          <Card.Meta>{item.brand_name}</Card.Meta>
          <Card.Description>{item.price}€</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {itemAction}
          <a onClick={this.handleClickView}>
            <Button 
              floated='right' 
              color='pink' 
              content='View' 
            />
          </a>
        </Card.Content>
      </Card>
    )
  }

}

const mapStateToProps = ({ items }) => ({ items })

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: bindActionCreators(removeItem, dispatch),
    saveItem: bindActionCreators(saveItem, dispatch),
    viewItem: bindActionCreators(viewItem, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard)