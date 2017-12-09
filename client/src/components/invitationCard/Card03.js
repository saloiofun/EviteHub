import React from 'react'

const Card03 = props => (
  <div id='saveArea' style={{
    height: '425px',
    width: '695px',
    fontFamily: props.titleFontType,
    backgroundImage: props.background,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    margin: '0 auto'}}>
    <p style={{ color: 'white', fontSize: props.titleFontSize, padding: '10% 0 5% 5%', marginTop: 0 }}> {props.title} </p>
    <p style={{ color: 'white', fontSize: '22px', padding: '0 0 0 17%' }}> {props.date} </p>
    <p style={{ color: 'white', fontSize: '15px', padding: '0 0 0 17%' }}> {props.time} </p>
    <p style={{ color: 'white', fontSize: '18px', padding: '0 0 0 17%' }}> {props.address1} </p>
    <p style={{ color: 'white', fontSize: '18px', padding: '0 0 0 17%' }}> {props.address2} </p>
  </div>
)

export default Card03
