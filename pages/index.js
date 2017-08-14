import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, loadItems, loadHitlist } from '../reducers/main'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import { getDresses, getHitlist } from '../dataservice/api'
import { Grid } from 'semantic-ui-react'
import ItemList from '../components/ItemList'
import LeftNavigation from '../components/LeftNavigation'
import RightNavigation from '../components/RightNavigation'

const PAGE_SIZE = 20

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
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} color='black'>
                <LeftNavigation />
              </Grid.Column>
              <Grid.Column width={13}>
                <ItemList 
                  items={this.props.items} 
                />
              </Grid.Column>
              <Grid.Column width={2} color='black'>
                <RightNavigation size={this.props.hitlist.length} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
