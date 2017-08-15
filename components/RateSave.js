import React from 'react'
import { Rating, Button, Icon } from 'semantic-ui-react'

const RatingSave = ({rating, saved, onSave, onRemove}) => {

  if (saved) {
    return <div>
      <Rating icon='star' defaultRating={0} maxRating={5} rating={rating} />
      <Button icon onClick={onRemove}><Icon name='close' /></Button>
    </div>
  } else {
    return <Rating icon='star' rating={rating} defaultRating={0} maxRating={5} onRate={onSave} />
  }
  
}

export default RatingSave