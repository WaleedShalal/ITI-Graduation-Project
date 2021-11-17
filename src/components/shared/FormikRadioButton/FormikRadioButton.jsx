import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikRadioButton.scss';

function FormRadioButton({ name, label, options }) {
  return (
    <div className='form__radio'>
      <label htmlFor={name} className=' text-white text-capitalize'>
        {label}
      </label>
      <Field name={name}>
        {(formikField) => {
          return (
            <div className='text-white'>
              {options.map((option) => {
                return (
                  <div key={option.id}>
                    <label htmlFor={option.value} className=''>
                      {option.value}
                    </label>
                    <input
                      className='input__style '
                      type='radio'
                      id={option.value}
                      {...formikField.field}
                      value={option.value}
                      checked={option.value === formikField.field.value}
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      </Field>
      <div className='d-flex w-100'>
        <FormErrorMessage className='w-100' name={name} />
      </div>
    </div>
  );
}

export default FormRadioButton;
