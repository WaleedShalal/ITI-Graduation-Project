import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import FormField from '../../shared/FormikField/FormikField';
import FormRadioButton from '../../shared/FormikRadioButton/FormikRadioButton';
import FormCheckboxInput from '../../shared/FormikCheckboxInput/ForminCheckboxInput';
import userImage from '../../../assets/images/user-img.png';

import './Register.scss';

function Register() {
  const genderOption = [
    {
      id: 1,
      value: 'male',
      label: 'Male',
    },
    {
      id: 2,
      value: 'female',
      label: 'Female',
    },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: [''],
    phoneNumber: '',
    website: '',
    followedHashtags: '',
    subscribeUs: false,
  };
  const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    birthDate: yup.string().required(),
    gender: yup.string().required(),
    email: yup
      .string()
      .email('Please Enter A Valid Email')
      .required('Please Enter Email'),
    password: yup
      .string()
      .min(8, 'Password Must Be At Least 8 Characters')
      .required('Please Enter Password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Password Must Be Matched')
      .required(),
    phoneNumber: yup.string().required(),
    website: yup.string().required(),
    followedHashtags: yup.string().required(),
  });
  const onSubmit = (values) =>
    alert(`Welcome ${values.firstName} ${values.lastName}`);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form>
            <div className='register__form container p-3 w-50'>
              <figure className='user__image w-25'>
                <img className='w-100 rounded-circle' src={userImage} alt='' />
              </figure>
              <div className='form__wrapper'>
                <div className='row'>
                  <FormField name='firstName' type='text' label='first name' />
                  <FormField name='lastName' type='text' label='last name' />
                  <FormField name='birthDate' type='date' label='birt hdate' />
                  <FormRadioButton
                    name='gender'
                    label='gender'
                    options={genderOption}
                  />
                  <FormField name='email' type='email' label='email' />
                  <FormField name='password' type='password' label='password' />
                  <FormField
                    name='confirmPassword'
                    type='password'
                    label='confirm password'
                  />
                  <FieldArray name='address'>
                    {(props) => {
                      const { push, remove, form } = props;
                      const { values } = form;
                      const { address } = values;
                      return (
                        <>
                          {address.map((_, index) => (
                            <div className='d-flex align-items-end' key={index}>
                              <FormField
                                name={`address[${index}]`}
                                type='text'
                                label='address'
                              />
                              <div className='col-2 d-flex justify-content-evenly'>
                                <button
                                  type='button'
                                  className='address__btn rounded-pill d-flex justify-content-center align-items-center btn btn-primary'
                                  onClick={() => push('')}>
                                  +
                                </button>
                                {index > 0 && (
                                  <button
                                    type='button'
                                    className='address__btn rounded-pill d-flex justify-content-center align-items-center  btn btn-danger'
                                    onClick={() => remove(index)}>
                                    -
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      );
                    }}
                  </FieldArray>
                  <FormField
                    name='phoneNumber'
                    type='text'
                    label='phone number'
                  />
                  <FormField name='website' type='text' label='website' />
                  <FormField
                    name='followedHashtags'
                    type='text'
                    label='followed hashtags'
                  />

                  <FormCheckboxInput
                    name='subscribeUs'
                    type='checkbox'
                    label='subscribe us'
                  />
                  <button
                    type='submit'
                    disabled={!formik.isValid}
                    className='register__btn rounded-pill w-25 mx-auto mt-2 btn btn-primary text-capitalize'>
                    register
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Register;
