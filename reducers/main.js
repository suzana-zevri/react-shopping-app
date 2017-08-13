import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import dataMiddleware from '../middlewares/data'
import actionTypes from  '../constants/actions'

const initialState = {
  items: [],
  hitlist: []
}


// REDUCERS
export const reducer = (state = initialState, action) => {
  let items = []

  switch (action.type) {

    case actionTypes.LOAD_ITEMS:
      return Object.assign({}, state, {items: action.items})
    
    case actionTypes.LOAD_HITLIST:
      
      let list = action.list.reduce( (prev, current) => {
        return prev.concat([current.dress_id])
      }, [])
      
      return Object.assign({}, state, {hitlist: list})
    
    case actionTypes.LOAD_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item.details = action.details
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
      let newHitlist = state.hitlist.concat([action.details.dress_id])
      return Object.assign({}, state, {hitlist: newHitlist})

    case actionTypes.VIEW_ITEM:
      items = state.items.map( item => {
        if (item.id === action.id) item.selected = true
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