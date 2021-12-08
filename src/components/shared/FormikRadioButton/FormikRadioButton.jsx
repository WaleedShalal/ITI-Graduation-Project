import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikRadioButton.scss';

function FormRadioButton({
  colWidth = 'col-xl-6',
  isRequired = 'true',
  name,
  label,
  options,
}) {
  return (
    <div className={`${colWidth} form__radio`}>
      <label htmlFor={name} className='mt-3 text-dark text-capitalize'>
        {label} {isRequired && <span className='text-danger'>*</span>}
      </label>
      <Field name={name}>
        {(formikField) => {
          return (
            <div className=' formik__radioBtn d-flex justify-content-evenly'>
              {options.map((option) => {
                return (
                  <div key={option.id} className='radio__btnWrapper'>
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
                      className='radio__label__style d-flex flex-nowrap justify-content-center align-items-center text-capitalize '>
                      {option.value}
                    </label>
                  </div>
                );
              })}
            </div>
          );
        }}
      </Field>
      <div className='d-flex w-100 mt-1'>
        <FormErrorMessage className='w-100' name={name} />
      </div>
    </div>
  );
}

export default FormRadioButton;
