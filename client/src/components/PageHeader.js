import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Card, { CardHeader } from 'material-ui/Card'

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3
  },
  bigAvatar: {
    width: 75,
    height: 75
  }
})

function PaperSheet (props) {
  const { classes, profile } = props
  return (
    <div>
      <Typography type='display1' component='h3'>
        {props.title}
      </Typography>
      <Typography type='body1' component='p'>
        {props.body}
      </Typography>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar alt={profile.name} src={profile.picture} className={classes.bigAvatar} />}
          title={profile.name}
          subheader={`UserID: ${profile.sub}`}
        />
      </Card>
    </div>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PaperSheet)
