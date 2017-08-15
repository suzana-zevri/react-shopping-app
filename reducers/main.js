import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import dataMiddleware from '../middlewares/data'
import actionTypes from  '../constants/actions'
import { map } from 'lodash/fp'

const initialState = {
  items: [],
  hitlist: [],
  totalPages: 0,
  selected: null
}

export const reducer = (state = initialState, action) => {
  let items = []
  let hitlist = []
  let selected = null

  switch (action.type) {

    case actionTypes.LOAD_ITEMS:
      items = action.items.map( item => {
        let foundIndex = map('dress_id', state.hitlist).indexOf(item.id)
        if (foundIndex > -1) {
          item.saved = true
          item.rating = state.hitlist[foundIndex].rating
        }
        return item
      })
      return Object.assign({}, state, {items: items, totalPages: action.totalPages})

    case actionTypes.LOAD_HITLIST:
      let list = action.list.reduce( (prev, current) => {
        return prev.concat([current])
      }, [])

      return Object.assign({}, state, {hitlist: list})

    case actionTypes.LOAD_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item = Object.assign({}, item, { details: action.details })
        return item
      })
      selected = Object.assign({}, state.selected, { details: action.details })
      return Object.assign({}, state, {items: items}, {selected: selected})
    
    case actionTypes.LOAD_SIMILAR_ITEMS:
      items = state.items.map( item => {
        if (item.id === action.id) item = Object.assign({}, item, { similar: action.items })
        return item
      })
      selected = Object.assign({}, state.selected, { similar: action.items })
      return Object.assign({}, state, {items: items}, {selected: selected})

    case actionTypes.REMOVE_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id){
          item.saved = false
          item.rating = 0
        }
        return item
      })
      selected = state.selected
      if (selected && (selected.id === action.id || selected.details.id === action.id )) {
        selected.saved = false
        selected.rating = 0
      }
      return Object.assign({}, state, {items: items}, {selected: selected})

    case actionTypes.SAVE_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id){
          item.saved = true
          item.rating = action.rating
        }
        return item
      })
      selected = state.selected
      if (selected && (selected.id === action.id || selected.details.id === action.id )) {
        selected.saved = true
        selected.rating = action.rating
      }
      return Object.assign({}, state, {items: items}, {selected: selected})

    case actionTypes.SAVE_ITEM_HITLIST:
      hitlist = state.hitlist.concat([action.details])
      return Object.assign({}, state, {hitlist: hitlist})

    case actionTypes.DELETE_ITEM_HITLIST:
      let index = map('dress_id', state.hitlist).indexOf(action.id)
      hitlist = state.hitlist.slice(0,index).concat(state.hitlist.slice(index+1))
      return Object.assign({}, state, {hitlist: hitlist})

    case actionTypes.VIEW_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) selected = item
        return item
      })
      return  Object.assign({}, state, {selected: selected})

    case actionTypes.CLOSE_ITEM:
      return  Object.assign({}, state, {selected: null})

    case actionTypes.RATE_ITEM:
      return state

    default: return state

  }
}

export const initStore = (initialState = initialState) => {
  const middleware = [thunkMiddleware, dataMiddleware]
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
}