import React from 'react';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import imgTest from '../../../assets/images/google.png';
import userImage from '../../../assets/images/user-img.png';

import './FormikImageInput';

function FormikImageInput({ name, type, label, formType }) {
  const imgPic = document.getElementById('testing__img');
  console.log(imgPic);

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
            {/* <figure className='col-6'>
              <img
                id='testing__img'
                className='profile__imgPreview bg-warning w-100'
                src={require('../../../assets/images/facebook.png').default}
                alt=''
              />
            </figure> */}
          </>
        );
      }}
    </Field>
  );
}

export default FormikImageInput;
