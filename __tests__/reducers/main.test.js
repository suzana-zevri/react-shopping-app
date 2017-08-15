import { head } from 'lodash/fp'
import { reducer } from '../../reducers/main'
import { expect } from 'chai'
import actionTypes from  '../../constants/actions'

describe('Main reducer', () => {
  it('should return the initial state', () => {
    const actual = reducer(undefined, {})
    const expected = {
      items: [],
      hitlist: [],
      totalPages: 0,
      selected: null
    }
    expect(actual).to.deep.equal(expected)
  })

  it('should handle VIEW_ITEM', () => {
    const fixtureItems = [{
      'brand_name': 'Miss Parisienne',
      'id': 'MJ021C01A-K11',
      'name': 'Occasion wear - navy',
      'price': 124.99,
      'thumbnails': [
        'http://i6.ztat.net/catalog_hd/MJ/02/1C/01/AK/11/MJ021C01A-K11@14.jpg',
        'http://i5.ztat.net/catalog_hd/MJ/02/1C/01/AK/11/MJ021C01A-K11@13.jpg'
      ]
    }]
    const actual = reducer({items: fixtureItems}, {
      type: actionTypes.VIEW_ITEM,
      id: 'MJ021C01A-K11'
    })    
    const expected = { items: fixtureItems, selected: head(fixtureItems) }    
    expect(actual).to.deep.equal(expected)
  })
})