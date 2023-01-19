import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Alert = (props) =>
 {
  const capitalize=(word)=>{
    if (word==="danger"){
      word="error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);

  }
    return (
      <div style={{height : '50px'}}>
            {props.alert && 
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
             <strong>{capitalize (props.alert.type )}</strong> : {props.alert.msg}
             
             </div>}
       </div>      
           );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
// #endregion

export default Alert;