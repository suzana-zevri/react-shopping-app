import React from 'react'
import { Icon, Menu} from 'semantic-ui-react'

const Pagination = ({activePage, onChange, totalPages}) => {
  console.log(activePage)

  let handleItemClick = (event) => {
    let pageNumber = event.target.text
    onChange(pageNumber)
  }

  let handlePrevClick = (event) => {
    let pageNumber = activePage - 1
    onChange(pageNumber)
  }

  let handleNextClick = (event) => {
    let pageNumber = activePage + 1
    onChange(pageNumber)
  }
  
  return (
    <Menu pagination>
      <Menu.Item name='prev' onClick={handlePrevClick} />
      <Menu.Item name='1' active={activePage == 1} onClick={handleItemClick} />
      <Menu.Item name='2' active={activePage == 2} onClick={handleItemClick} />
      <Menu.Item name='3' active={activePage == 3} onClick={handleItemClick} />
      <Menu.Item disabled>...</Menu.Item>
      <Menu.Item name={totalPages-2} active={activePage == totalPages-2} onClick={handleItemClick} />
      <Menu.Item name={totalPages-1} active={activePage == totalPages-1} onClick={handleItemClick} />
      <Menu.Item name='next' onClick={handleNextClick} />
    </Menu>
  )

}

export default Pagination