import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikField.scss';

function FormField({
  isRequired = true,
  name,
  type,
  label,
  colWidth = 'col-12',
}) {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <div className={colWidth}>
            <label htmlFor={name} className='text-dark text-capitalize mt-3'>
              {label} {isRequired && <span className='text-danger'>*</span>}
            </label>
            <input
              className='input__style w-100 ps-2 mb-1'
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
