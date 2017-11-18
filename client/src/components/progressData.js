import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
})

function CircularDeterminate (props) {
  const { classes } = props
  return (
    <div>
      <CircularProgress
        color={props.color}
        className={classes.progress}
        size={150}
        mode='determinate'
        value={props.value}
        min={0}
        max={props.max}
        thickness={4}
      />
    </div>
  )
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CircularDeterminate)
