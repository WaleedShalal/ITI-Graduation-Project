import React from 'react';
import { Field } from 'formik';
import './FormikCheckboxInput.scss';

function FormCheckboxInput({ name, type, label }) {
  return (
    <div className=''>
      <Field name={name}>
        {(formikField) => {
          return (
            <div className=''>
              <label htmlFor={name} className='text-white text-capitalize'>
                {label}
              </label>
              <input
                className='input__style'
                type={type}
                id={name}
                {...formikField.field}
                defaultChecked={formikField.field.value}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
}

export default FormCheckboxInput;
