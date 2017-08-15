import { Card } from 'semantic-ui-react'
import ItemCard from '../components/ItemCard'

export default ({items}) => {
  if (!items.length) return null

  return (
    <Card.Group itemsPerRow='five'>
      {items.map( item => (
          <ItemCard item={item} key={item.id} similar />
        )
      )}
    </Card.Group>
  )
}