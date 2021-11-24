import React from 'react';
import { Field } from 'formik';
import './FormikCheckboxInput.scss';

function FormCheckboxInput({ name, type, label }) {
  return (
    <div className=''>
      <Field name={name}>
        {(formikField) => {
          return (
            <div className='mt-3'>
              <input
                className='input__style'
                type={type}
                id={name}
                {...formikField.field}
                defaultChecked={formikField.field.value}
              />
              <label htmlFor={name} className='ps-1 text-dark text-capitalize'>
                {label}
              </label>
            </div>
          );
        }}
      </Field>
    </div>
  );
}

export default FormCheckboxInput;
