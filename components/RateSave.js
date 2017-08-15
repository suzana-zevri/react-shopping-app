import React from 'react'
import { Rating, Button, Icon } from 'semantic-ui-react'

const RatingSave = ({rating, saved, onSave, onRemove}) => {

  if (saved) {
    return <div>
      <Rating icon='heart' defaultRating={0} maxRating={5} rating={rating} />
      <Button icon onClick={onRemove}><Icon name='close' /></Button>
    </div>
  } else {
    return <Rating icon='heart' rating={rating} defaultRating={0} maxRating={5} onRate={onSave} />
  }
  
}

export default RatingSave