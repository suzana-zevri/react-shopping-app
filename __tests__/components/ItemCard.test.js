import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ItemCard } from '../../components/ItemCard'


describe('<ItemCard/> ', () => {
  it('should test the default rendering', () => {        
    const item = {
      'brand_name': 'Miss Parisienne',
      'id': 'MJ021C01A-K11',
      'name': 'Occasion wear - navy',
      'price': 124.99,
      'thumbnails': [
        'http://i6.ztat.net/catalog_hd/MJ/02/1C/01/AK/11/MJ021C01A-K11@14.jpg',
        'http://i5.ztat.net/catalog_hd/MJ/02/1C/01/AK/11/MJ021C01A-K11@13.jpg'
      ]
    }
    const wrapper = shallow(<ItemCard item={item} key={item.id}/>)    
    expect(wrapper.find('Card')).to.length(1);
  })
})
