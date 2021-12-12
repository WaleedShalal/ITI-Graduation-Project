import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikImageInput';

function FormikImageInput({ name, type, label, formType }) {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <>
            <div className='col-6'>
              <label htmlFor={name} className='text-white text-capitalize mt-3'>
                {label}
              </label>
              <input
                className='input__style w-100 ps-2 mb-1'
                accept='image/*'
                type={type}
                id={name}
                {...formikField.field}
                defaultChecked={formikField.field.value}
              />
              <div className=''>
                <FormErrorMessage name={name} />
              </div>
            </div>
          </>
        );
      }}
    </Field>
  );
}

export default FormikImageInput;
