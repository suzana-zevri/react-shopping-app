import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeItem, removeItem, saveItem, getSimilar} from '../reducers/actions'
import { Modal, Icon, Reveal, Image, Button, Header, Loader, Dimmer, Label, Divider, Segment } from 'semantic-ui-react'
import RateSave from './RateSave'
import Similar from './Similar'
import theme from '../constants/theme'

export class ItemDetail extends Component {

  state = { modalOpen: this.props.modalOpen, currentImageIndex: 0, imageCount: 0 }

  handleClose = () => {
    const id = this.props.item.details.id
    this.setState({ modalOpen: false })
    this.props.closeItem(id)
  }

  handleGetSimilar = () => {
    const id = this.props.item.details.id
    this.props.getSimilar(id)
  }

  handleSave = (event, trigger) => {
    const id = this.props.item.details.id
    this.props.saveItem(id, trigger.rating)
  }

  handleRemove = (value) => {
    const id = this.props.item.details.id
    this.props.removeItem(id)
  }

  render () {
    const item = this.props.item
    if (!item) return null 

    const details = item.details
    const similar = item.similar
    let content = null
    let similarItems = null
    let getSimilarAction = null

    if(similar) {
      similarItems = <Similar items={similar}/>
    } else {
      similarItems = <Button onClick={this.handleGetSimilar} color={theme.SECONDARY_COLOR}>
            Check similar dresses
          </Button>
    }

    if (details) {
      let gallery = null
      if (details.images && details.images.length){
        let imageSrc = details.images[1]
        gallery = <Image src={imageSrc} size='medium' wrapped/>
      }


      content =
        <Modal.Content image scrolling>
          {gallery}
          <Modal.Description>
            <Header>
              <h2>{details.name}</h2>
              <Header.Subheader>{details.brand.name}</Header.Subheader>
            </Header>
            
            <Label as='a' color={theme.PRIMARY_COLOR}>Price: {details.price}€</Label>
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
            {similarItems}
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
        size='large'
      >
        {content}
        <Modal.Actions>
          <Button onClick={this.handleClose} color='grey'>
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