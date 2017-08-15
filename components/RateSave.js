import React from 'react'
import { Rating, Button, Icon } from 'semantic-ui-react'

const RatingSave = ({rating, saved, onSave, onRemove}) => {

  if (saved) {
    return (
      <span>
        <Rating
          icon='heart'
          maxRating={5}
          rating={rating}
        />
        <Button icon inverted onClick={onRemove}>
          <Icon name='close' color='black' />
        </Button>
      </span>
    )
  } else {
    return (
      <Rating
        icon='heart'
        rating={rating}
        maxRating={5}
        onRate={onSave}
        size='tiny'
       />
    )
  }

}

export default RatingSave