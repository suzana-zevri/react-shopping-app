import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { viewItem, removeItem, saveItem } from '../reducers/main'

class ItemCard extends Component {

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
      itemAction = <a onClick={this.handleClickRemove}>Remove</a>
    } else {
      itemAction = <a onClick={this.handleClickSave}>Save</a>
    }

    return (
      <div>
        <h1>{item.name}</h1>
        <a onClick={this.handleClickView}>View</a>
        {itemAction}
        <h3>{item.brand_name}</h3>
        <h4>{item.price}</h4>
        <div>
          {item.thumbnails.map( thumb => {
            return <img key={thumb} src={thumb} />
          })}
        </div>
      </div>
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