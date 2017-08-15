import ItemCard from '../components/ItemCard'
import { Card, Divider } from 'semantic-ui-react'
import ItemDetails from './ItemDetails'
import Pagination from './Pagination'

export default ({items, activePage, onPageChange, totalPages}) => {
  if (!items.length) return null

  return (
    <div>
      <Pagination totalPages={totalPages} activePage={activePage} onChange={onPageChange}/>
      <Divider />
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
      <Divider />
      <Pagination totalPages={totalPages} activePage={activePage} onChange={onPageChange} />
    </div>
  )
}