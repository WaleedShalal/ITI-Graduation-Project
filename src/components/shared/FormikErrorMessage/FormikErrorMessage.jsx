import React from 'react';
import { ErrorMessage } from 'formik';
import './FormikErrorMessage.scss';

function FormikErrorMessage({ name }) {
  return (
    <ErrorMessage name={name}>
      {(errMessage) => {
        return (
          <div className='error__message text-danger  ps-2'>{errMessage}</div>
        );
      }}
    </ErrorMessage>
  );
}

export default FormikErrorMessage;
