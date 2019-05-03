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
  console.log("meta");
  console.log(meta);
  const isError = `field ${meta.error && meta.touched ? 'error' : ''}` ;
  return(
    <div className={isError}>
      <label htmlFor="">{label}</label>
      <input {...input} autoComplete="off" />
      <div>{meta.error}</div>
      {this.renderError(meta)}
    </div>
  );
}
