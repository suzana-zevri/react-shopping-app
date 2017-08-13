import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, loadItems, loadHitlist } from '../reducers/main'
import withRedux from 'next-redux-wrapper'
import ItemCard from '../components/ItemCard'
import { getDresses, getHitlist } from '../dataservice/api'

const PAGE_SIZE = 50

class ItemsList extends React.Component {

  static async getInitialProps ({ store }) {
    const {items, pages} = await getDresses(PAGE_SIZE, 0)
    const hitlist = await getHitlist()
    store.dispatch(loadHitlist(hitlist))
    store.dispatch(loadItems(items))
    return { items, hitlist }
  }

  render () {

    return (
      <div>
        <h1>Saved items</h1>
        {this.props.hitlist.map( item => {
          return <div key={item.line_id}>{item.dress_id}</div>
        })}
        <h2>All items</h2>
        {this.props.items.map( item => {
          return <ItemCard item={item} key={item.id} />
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ items, hitlist }) => ({ items, hitlist })

const mapDispatchToProps = dispatch => {
  return {
    loadItems: bindActionCreators(loadItems, dispatch),
    loadHitlist: bindActionCreators(loadHitlist, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ItemsList)
