import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikRadioButton.scss';

function FormRadioButton({ isRequired, name, label, options }) {
  return (
    <div className='form__radio col-6'>
      <label htmlFor={name} className='mt-3 text-white text-capitalize'>
        {label} {isRequired && <span className='text-danger'>*</span>}
      </label>
      <Field name={name}>
        {(formikField) => {
          return (
            <div className='text-white d-flex justify-content-evenly'>
              {options.map((option) => {
                return (
                  <div key={option.id}>
                    <input
                      className='radio__input__style '
                      type='radio'
                      id={option.value}
                      {...formikField.field}
                      value={option.value}
                      checked={option.value === formikField.field.value}
                    />
                    <label
                      htmlFor={option.value}
                      className='radio__label__style d-flex justify-content-center align-items-center rounded-pill text-capitalize'>
                      {option.value}
                    </label>
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
