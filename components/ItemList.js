import ItemCard from '../components/ItemCard'
import { Card, Divider } from 'semantic-ui-react'
import ItemDetails from './ItemDetails'
import Pagination from './Pagination'

export default ({items, activePage, onPageChange, totalPages}) => {
  if (!items.length) return null
  let itemSelected = null


  return (
    <div>
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        onChange={onPageChange}
      />
      <Divider /> 
      <Card.Group itemsPerRow='four' stackable>
        {items.map( item => (
            <ItemCard item={item} key={item.id} />
          )
        )}
      </Card.Group>
      <Divider />
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        onChange={onPageChange}
      />
    </div>
  )
}