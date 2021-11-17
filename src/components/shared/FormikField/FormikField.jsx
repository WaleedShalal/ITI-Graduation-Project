import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikField.scss';

function FormField({ name, type, label }) {
  const colWidth =
    label === 'email' || label === 'followed hashtags'
      ? 'col-12'
      : label === 'address'
      ? 'col-10'
      : 'col-6';
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <div className={colWidth}>
            <label htmlFor={name} className='text-white text-capitalize'>
              {label}
            </label>
            <input
              className='input__style w-100 ps-2 mb-3'
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
