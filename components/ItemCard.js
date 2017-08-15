import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { viewItem, removeItem, saveItem } from '../reducers/actions'
import { Card, Image, Button } from 'semantic-ui-react'
import RateSave from './RateSave'
import theme from '../constants/theme'


export class ItemCard extends Component {

  state = { currentImage: this.props.item.thumbnails[1] }

  handleMouseOver = () => {
     const currentImage = this.props.item.thumbnails[0]
     this.setState({currentImage})
  }

  handleMouseOut = () => {
     const currentImage = this.props.item.thumbnails[1]
     this.setState({currentImage})
  }

  handleClickView = () => {
    const id = this.props.item.id
    this.props.viewItem(id)
  }

  handleSave = (event, trigger) => {
    const id = this.props.item.id
    this.props.saveItem(id, trigger.rating)
  }

  handleRemove = (value) => {
    const id = this.props.item.id
    this.props.removeItem(id)
  }

  render () {
    const item = this.props.item
    let viewAction = null

    if (!this.props.similar) {
      viewAction = <Button
              floated='right'
              color={theme.PRIMARY_COLOR}
              content='View'
              onClick={this.handleClickView}
            />
    }

    return (
      <Card>
        <div
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <Image src={this.state.currentImage} />
        </div>
        <Card.Content>
          <h4> {item.name} </h4>
          <Card.Meta>{item.brand_name}</Card.Meta>
          <Card.Description>{item.price}€</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RateSave
            saved={item.saved}
            rating={item.rating}
            onSave={this.handleSave}
            onRemove={this.handleRemove}
          />
          {itemAction}
          {viewAction}
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