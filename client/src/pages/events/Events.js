import React from 'react'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ButtonBase from 'material-ui/ButtonBase'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

const images = [
  {
    url: 'https://thumb1.shutterstock.com/display_pic_with_logo/1312810/220840597/stock-vector-stick-figure-business-ideas-220840597.jpg',
    title: 'View Events',
    width: '100%',
    height: '100%'
  },
  {
    url: 'https://openclipart.org/image/2400px/svg_to_png/176288/stick-person-base.png',
    title: 'Add A New Event',
    width: '100%',
    height: '100%'
  }
]

function Events (props) {
  const { classes } = props

  return (
    <Grid container className={classes.root} style={{height: '100%'}}>
      {images.map(image => (
        <Grid item xs={12} sm={6}>
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            style={{
              width: image.width,
              height: image.height
            }}
          >
            <div
              style={{
                backgroundColor: `black`
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component='h3'
                type='subheading'
                color='inherit'
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  )
}

Events.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Events)
