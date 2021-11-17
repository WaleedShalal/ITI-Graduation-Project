import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikField.scss';

function FormField({ name, type, label }) {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <div>
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
            <div className=''>
              <FormErrorMessage name={name} />
            </div>
          </div>
        );
      }}
    </Field>
  );
}

export default FormField;
