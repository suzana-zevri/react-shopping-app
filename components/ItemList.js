import ItemCard from '../components/ItemCard'
import { Card } from 'semantic-ui-react'
import ItemDetails from './ItemDetails'

export default ({items, hitlist}) => {
  return (
    <div>
      <h1>Saved items</h1>
      {hitlist.map( item => {
        return <div key={item.line_id}>{item.dress_id}</div>
      })}
      <h2>All items</h2>
      <Card.Group itemsPerRow='five' stackable>
        {items.map( item => {
          let itemSelected = null
          if (item.selected) {
            itemSelected = <ItemDetails item={item} modalOpen={true} /> 
          }
          return (
            <ItemCard item={item} key={item.id} itemSelected={itemSelected} />
          )
        })}
      </Card.Group>
    </div>
  )
}