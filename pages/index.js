import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../reducers/main'
import { loadItems, loadHitlist, getItems } from '../reducers/actions'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import { getDresses, getHitlist } from '../dataservice/api'
import { Grid, Message, Divider } from 'semantic-ui-react'
import ItemList from '../components/ItemList'
import ItemDetails from '../components/ItemDetails'
import LeftNavigation from '../components/LeftNavigation'
import RightNavigation from '../components/RightNavigation'

const PAGE_SIZE = 40

const PageHead = () => (
  <Head>
    <title>Dresses Service</title>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="stylesheet" href="/static/css/semantic.min.css" />
  </Head>
)

const ErrorNotification = ({error}) => (
  <Message negative>
    <Message.Header>We're very sorry, there was a connection error while loading the items.</Message.Header>
    <p>Please reload the page to try again.</p>
    <p>Details: {error.message} </p>
  </Message>
)

export class App extends React.Component {

  state = { activePage: 1 }

  static async getInitialProps ({ store }) {
    try {
      const {items, totalPages} = await getDresses(PAGE_SIZE, 0)
      store.dispatch(loadItems(items, totalPages))
      const hitlist = await getHitlist()
      store.dispatch(loadHitlist(hitlist))
      return { items, totalPages, hitlist }
    } catch (error) {
      return {error}
    }
  }

  handlePageChange = (page) => {
    this.setState({activePage: page})
    this.props.getItems(PAGE_SIZE, page)
  }

  render () {
    let notification = null
    let selectedItem = null
    if (this.props.error) notification = <ErrorNotification error={this.props.error} />
    if (this.props.selected) selectedItem = <ItemDetails item={this.props.selected} modalOpen={true} />

    return (
      <section>
        <PageHead />
        <main>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} color='black' stretched>
                <LeftNavigation />
              </Grid.Column>
              <Grid.Column width={14} style={{ minHeight: '100vh' }}>
                <Divider hidden />
                {notification}
                {selectedItem}
                <ItemList
                  items={this.props.items}
                  totalPages={this.props.totalPages}
                  activePage={this.state.activePage}
                  onPageChange={this.handlePageChange}
                />
              </Grid.Column>
              <Grid.Column width={1} color='black' style={{ padding: 0 }}>
                <RightNavigation size={this.props.hitlist.length} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
      </section>
    )
  }
}

const mapStateToProps = ({ items, totalPages, hitlist, selected }) => (
  { items, totalPages, hitlist, selected }
)

const mapDispatchToProps = dispatch => {
  return {
    loadItems: bindActionCreators(loadItems, dispatch),
    loadHitlist: bindActionCreators(loadHitlist, dispatch),
    getItems: bindActionCreators(getItems, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(App)
