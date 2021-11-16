import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import FormField from '../form-field/FormField';
import FormRadioButton from './../../form-radio-buuton/FormRadioButton';
import FormCheckboxInput from './../form-checkbox-input/FormCheckboxInput';
import './Register.scss';

function RegisterForm() {
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
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    followedHashtag: [''],
    subscribeUs: false,
  };
  const validationSchema = yup.object({
    username: yup.string().required(),
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
    gender: yup.string().required(),
  });
  const onSubmit = (values) => alert(`Welcome "${values.username}""`);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form>
            <div className='register__form d-flex flex-column align-items-center mt-5 p-3 w-75 mx-auto'>
              <FormField name='username' type='text' label='username' />
              <FormField name='email' type='email' label='email' />
              <FormField name='password' type='password' label='password' />
              <FormField
                name='confirmPassword'
                type='password'
                label='confirmPassword'
              />

              <FormRadioButton
                name='gender'
                label='gender'
                options={genderOption}
              />

              <FieldArray name='followedHashtag'>
                {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { followedHashtag } = values;
                  return (
                    <>
                      {followedHashtag.map((_, index) => (
                        <div
                          className='w-100 d-flex align-items-center flex-column'
                          key={index}>
                          <FormField
                            name={`followedHashtag[${index}]`}
                            type='text'
                            label='followedHashtag'
                          />
                          <div className='d-flex justify-content-around w-50'>
                            <button
                              type='button'
                              className='btn btn-primary  '
                              onClick={() => push('')}>
                              +
                            </button>
                            {index > 0 && (
                              <button
                                type='button'
                                className='btn btn-danger'
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
              <FormCheckboxInput
                name='subscribeUs'
                type='checkbox'
                label='subscribeUs'
              />
              <button
                type='submit'
                disabled={!formik.isValid}
                className='register__btn btn btn-primary text-capitalize w-25'>
                register
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterForm;
