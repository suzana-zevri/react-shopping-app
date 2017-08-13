import {getDress, addToHitlist, removeFromHitlist} from  '../dataservice/api'
import actionTypes from  '../constants/actions'

const dataMiddleware = store => next => async (action) => {

  next(action)

  switch (action.type) {

    case actionTypes.VIEW_ITEM:
      const item = await getDress(action.id)
      console.log('view', item)
      next({ type: actionTypes.LOAD_ITEM, id:action.id, details: item })
      break
    
    case actionTypes.SAVE_ITEM:
      const savedItem = await addToHitlist(action.id)
      const details = JSON.parse(savedItem)
      if (details.dress_id){
        next({ type: actionTypes.SAVE_ITEM_HITLIST, id:action.id, details })
      }
      break

    
    default:
      break

  }
}

export default dataMiddleware