import React from 'react';
import { ErrorMessage } from 'formik';
import './FormikErrorMessage.scss';

function FormikErrorMessage({ name }) {
  return (
    <ErrorMessage name={name}>
      {(errMessage) => {
        return (
          <div className='error__message bg-warning text-danger text-capitalize'>
            {errMessage}
          </div>
        );
      }}
    </ErrorMessage>
  );
}

export default FormikErrorMessage;
