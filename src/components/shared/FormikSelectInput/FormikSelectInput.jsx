import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikSelectInput.scss';

function FormikSelectInput({
  colWidth = 'col-xl-6',
  isRequired,
  name,
  type,
  label,
}) {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <div className={`form-group ${colWidth}`}>
            <label htmlFor={name} className='text-dark text-capitalize mt-3'>
              {label} {isRequired && <span className='text-danger'>*</span>}
            </label>
            <select
              className='w-100 ps-2 mb-1'
              type={type}
              id={name}
              {...formikField.field}
              defaultChecked={formikField.field.initialValues}>
              <option value='' disabled>
                Select ---
              </option>
              <option value="men's clothing">men's clothing</option>
              <option value="women's clothing">women's clothing</option>
              <option value='jewelery'>jewelery</option>
              <option value='electronics'>electronics</option>
            </select>
            <div className=''>
              <FormErrorMessage name={name} />
            </div>
          </div>
        );
      }}
    </Field>
  );
}

export default FormikSelectInput;
