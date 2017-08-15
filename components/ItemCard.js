import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { viewItem, removeItem, saveItem } from '../reducers/actions'
import { Card, Image, Button, Icon, Reveal } from 'semantic-ui-react'
import RateSave from './RateSave'
import theme from '../constants/theme'


export class ItemCard extends Component {


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
    let rateAction = null

    if (!this.props.similar) {
      rateAction = <RateSave
            saved={item.saved}
            rating={item.rating}
            onSave={this.handleSave}
            onRemove={this.handleRemove}
          />
    }

    return (
      <Card>
        <Reveal animated='small fade' onClick={this.handleClickView}>
          <Reveal.Content hidden>
            <Image src={this.props.item.thumbnails[0]} />
          </Reveal.Content>
          <Reveal.Content visible>
            <Image src={this.props.item.thumbnails[1]} />
          </Reveal.Content>
        </Reveal>
        <Card.Content>
          <h4> {item.name} </h4>
          <Card.Meta>{item.brand_name}</Card.Meta>
          <Card.Description>{item.price}€</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {rateAction}
          <Button
            floated='right'
            color={theme.PRIMARY_COLOR}
            onClick={this.handleClickView}
            content='view'
            />
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