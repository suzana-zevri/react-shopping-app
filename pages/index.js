import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, loadItems, loadHitlist } from '../reducers/main'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import ItemList from '../components/ItemList'
import { getDresses, getHitlist } from '../dataservice/api'

const PAGE_SIZE = 16

class App extends React.Component {

  static async getInitialProps ({ store }) {
    const {items, pages} = await getDresses(PAGE_SIZE, 0)
    const hitlist = await getHitlist()
    store.dispatch(loadHitlist(hitlist))
    store.dispatch(loadItems(items))
    return { items, hitlist }
  }

  render () {
    return (
      <section>
        <Head>
          <title>Dresses Service</title>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="/static/css/semantic.min.css" />
        </Head>
        <main>
          <ItemList 
            hitlist={this.props.hitlist} 
            items={this.props.items} 
          />
        </main>
      </section>
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

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(App)
