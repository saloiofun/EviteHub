import React from "react";

const Card01 = props => (
  <div id='saveArea' style={{ textAlign: 'center',
	  height: '425px',
	  width: '710px',
	  fontFamily: props.titleFontType,
	  backgroundImage: props.background,
	  backgroundRepeat: 'no-repeat',
	  backgroundSize: 'cover'}}>
	  <p style={{ color: 'white', fontSize: props.titleFontSize, padding: '14% 0 0 0' }}> {props.title} </p>
	  <p style={{ color: 'white', fontSize: '22px' }}> {props.date} </p>
	  <p style={{ color: 'white', fontSize: '15px' }}> {props.time} </p>
	  <p style={{ color: 'white', fontSize: '18px' }}> {props.address1} </p>
	  <p style={{ color: 'white', fontSize: '18px' }}> {props.address2} </p>
	</div>
);

export default Card01;