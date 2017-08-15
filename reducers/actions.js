import actionTypes from  '../constants/actions'


export const viewItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.VIEW_ITEM, id: id })
}

export const closeItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.CLOSE_ITEM, id: id })
}

export const removeItem = (id) => dispatch => {
  return dispatch({ type: actionTypes.REMOVE_ITEM, id: id })
}

export const saveItem = (id, rating) => dispatch => {
  return dispatch({ type: actionTypes.SAVE_ITEM, id, rating })
}

export const rateItem = (id, rating) => dispatch => {
  return dispatch({ type: actionTypes.ADD, id, rating })
}

export const loadItem = (id, details) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_ITEMS, id, details })
}

export const getItems = (pageSize, pageNum) => dispatch => {
  return dispatch({ type: actionTypes.GET_ITEMS, pageSize, pageNum })
}

export const loadItems = (items, totalPages) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_ITEMS, items, totalPages })
}

export const loadHitlist = (list) => dispatch => {
  return dispatch({ type: actionTypes.LOAD_HITLIST, list })
}

export const getSimilar = (id) => dispatch => {
  return dispatch({ type: actionTypes.GET_SIMILAR, id })
}