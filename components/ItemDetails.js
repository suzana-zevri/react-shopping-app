import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeItem, removeItem, saveItem, getSimilar} from '../reducers/actions'
import { Modal, Icon, Image, Button, Header, Loader, Dimmer, Label, Divider } from 'semantic-ui-react'
import RateSave from './RateSave.js'

export class ItemDetail extends Component {

  state = { modalOpen: this.props.modalOpen }

  handleClose = () => {
    const id = this.props.item.id
    this.setState({
      modalOpen: false,
    })
    this.props.closeItem(id)
  }

  handleGetSimilar = () => {
    const id = this.props.item.id
    this.props.getSimilar(id)
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
    const details = item.details
    let content = null

    console.log(item)

    if (details) {
      let gallery = null
      if (details.images.length){
        gallery = <Image wrapped size='medium' src={details.images[0]} />
      }


      content =
        <Modal.Content image scrolling>
          {gallery}
          <Modal.Description>
            <Header>
              <h2>{item.name}</h2>
              <Header.Subheader>{details.brand.name}</Header.Subheader>
            </Header>
            <Label as='a' color='pink'>Price: {details.price}€</Label>
            <Label as='a' color={details.color.toLowerCase()} tag>Color {details.color}</Label>
            <Label as='a' tag>{details.season}</Label>
            <Divider hidden />
            <RateSave
              saved={item.saved}
              rating={item.rating}
              onSave={this.handleSave}
              onRemove={this.handleRemove}
            />
            <Divider hidden />
            <Button onClick={this.handleGetSimilar}>
              Similar dresses
            </Button>
          </Modal.Description>
        </Modal.Content>
    } else {
      content = <Dimmer active><Loader active inverted/> </Dimmer>

    }

    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeOnEscape={true}
        closeOnRootNodeClick={true}
      >
        {content}
        <Modal.Actions>
          <Button onClick={this.handleClose} color='black'>
             Close details
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

}

const mapStateToProps = ({ items }) => ({ items })

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: bindActionCreators(removeItem, dispatch),
    saveItem: bindActionCreators(saveItem, dispatch),
    closeItem: bindActionCreators(closeItem, dispatch),
    getSimilar: bindActionCreators(getSimilar, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail)