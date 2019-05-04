import React from 'react';

export const renderError = ({error,touched}) => {
  if(touched && error){
    return(
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
  return null;
}

export const renderInput = ({input, label, meta}) => { //destructuring formProps
  const isError = `field ${meta.error && meta.touched ? 'error' : ''}` ;
  return(
    <div className={isError}>
      <label htmlFor="">{label}</label>
      <input {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
}

export const moneyFormat = amount => Math.floor(100 * amount) / 100
