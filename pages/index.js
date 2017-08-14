import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, loadItems, loadHitlist } from '../reducers/main'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head';
import { getDresses, getHitlist } from '../dataservice/api'
import { Grid, Message, Divider } from 'semantic-ui-react'
import ItemList from '../components/ItemList'
import LeftNavigation from '../components/LeftNavigation'
import RightNavigation from '../components/RightNavigation'

const PAGE_SIZE = 20

class App extends React.Component {

  static async getInitialProps ({ store }) {
    try {
      const {items, pages} = await getDresses(PAGE_SIZE, 0)
      store.dispatch(loadItems(items))
      const hitlist = await getHitlist()
      store.dispatch(loadHitlist(hitlist))
      return { items, hitlist }
    } catch (error) {
      return {error}
    }
  }

  render () {
    let notification = null
    console.log(this.props.error)
    if (this.props.error) {
      notification =
      <Message negative>
        <Message.Header>We're very sorry, there was a connection error while loading the items.</Message.Header>
        <p>Please reload the page to try again.</p>
        <p>Details: {this.props.error.message} </p>
      </Message>
    }

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
              <Grid.Column width={1} color='black' stretched>
                <LeftNavigation />
              </Grid.Column>
              <Grid.Column width={13} style={{ height: '100vh' }}>
                <Divider hidden />
                {notification}
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
