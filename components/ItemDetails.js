import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeItem, removeItem, saveItem, getSimilar} from '../reducers/main'
import { Modal, Icon, Image, Button, Header, Loader, Dimmer, Label, Divider } from 'semantic-ui-react'

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


  render () {
    const item = this.props.item
    const details = item.details
    console.log(details)

    let content = null
    if (details) {
      content =
        <Modal.Content image scrolling>
          <Image wrapped size='medium' src={details.images[0]} />
          <Modal.Description>
            <Header>
              <h2>{item.name}</h2>
              <Header.Subheader>{details.brand.name}</Header.Subheader>
            </Header>
            <Label as='a' color={details.color.toLowerCase()} tag>Color {details.color}</Label>
            <Label as='a' tag>{details.season}</Label>
            <Label as='a' color='pink'>Price: {details.price}€</Label>
            <Divider hidden />
            <Button onClick={this.handleGetSimilar} color='pink'>
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