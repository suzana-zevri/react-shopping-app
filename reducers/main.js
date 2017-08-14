import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import dataMiddleware from '../middlewares/data'
import actionTypes from  '../constants/actions'
import { map } from 'lodash/fp'

const initialState = {
  items: [],
  hitlist: []
}


// REDUCERS
export const reducer = (state = initialState, action) => {
  let items = []
  let hitlist = []

  switch (action.type) {

    case actionTypes.LOAD_ITEMS:
      items = action.items.map( item => {
        if (map('dress_id', state.hitlist).indexOf(item.id) > -1) item.saved = true
        return item
      })
      return Object.assign({}, state, {items: items})
    
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
      return Object.assign({}, state, {items: items})

    case actionTypes.REMOVE_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item.saved = false
        return item
      })
      return Object.assign({}, state, {items: items})

    case actionTypes.SAVE_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item.saved = true
        return item
      })
      return Object.assign({}, state, {items: items})
    
    case actionTypes.SAVE_ITEM_HITLIST:
      hitlist = state.hitlist.concat([action.details])
      return Object.assign({}, state, {hitlist: hitlist})

    case actionTypes.DELETE_ITEM_HITLIST:
      let index = map('dress_id', state.hitlist).indexOf(action.id)
      hitlist = state.hitlist.slice(0,index).concat(state.hitlist.slice(index+1))
      return Object.assign({}, state, {hitlist: hitlist})

    case actionTypes.VIEW_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item.selected = true
        return item
      })
      return  Object.assign({}, state, {items: items})
    
    case actionTypes.CLOSE_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item.selected = false
        return item
      })
      return  Object.assign({}, state, {items: items})
    
    case actionTypes.RATE_ITEM:
      return state

    default: return state

  }
}

// ACTIONS
export const viewItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.VIEW_ITEM, id: id })
}

export const closeItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.CLOSE_ITEM, id: id })
}

export const removeItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.REMOVE_ITEM, id: id })
}

export const saveItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.SAVE_ITEM, id: id })
}

export const rateItem = (id, rating) => dispatch => {
  return dispatch({ type: actionTypes.ADD, id: id, rating: rating })
}

export const loadItem = (id, details) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_ITEMS, id: id, details:details })
}

export const loadItems = (items) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_ITEMS, items: items })
}

export const loadHitlist = (list) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_HITLIST, list: list })
}

export const initStore = (initialState = initialState) => {
  const middleware = [thunkMiddleware, dataMiddleware]
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
}