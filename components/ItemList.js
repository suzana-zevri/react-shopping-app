import ItemCard from '../components/ItemCard'
import { Card } from 'semantic-ui-react'
import ItemDetails from './ItemDetails'

export default ({items}) => {
   if (!items.length) return null

  return (
    <div>
      <h2>All items</h2>
      <Card.Group itemsPerRow='four' stackable>
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