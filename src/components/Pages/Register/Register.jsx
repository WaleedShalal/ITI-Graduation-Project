import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import FormField from '../../shared/FormikField/FormikField';
import FormRadioButton from '../../shared/FormikRadioButton/FormikRadioButton';
import FormCheckboxInput from '../../shared/FormikCheckboxInput/ForminCheckboxInput';
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
    address: yup.string().required(),
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
            <div className='register__form'>
              <FormField name='firstName' type='text' label='firstname' />
              <FormField name='lastName' type='text' label='lastname' />
              <FormField name='birthDate' type='date' label='birthdate' />
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
                label='confirmPassword'
              />
              <FieldArray name='address'>
                {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { address } = values;
                  return (
                    <>
                      {address.map((_, index) => (
                        <div className='' key={index}>
                          <FormField
                            name={`address[${index}]`}
                            type='text'
                            label='address'
                          />
                          <div className=''>
                            <button
                              type='button'
                              className='btn btn-primary'
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
              <FormField name='phoneNumber' type='text' label='phoneNumber' />
              <FormField name='website' type='text' label='website' />
              <FormField name='website' type='text' label='website' />
              <FormField
                name='followedHashtags'
                type='text'
                label='followed hashtags'
              />

              <FormCheckboxInput
                name='subscribeUs'
                type='checkbox'
                label='subscribeUs'
              />
              <button
                type='submit'
                disabled={!formik.isValid}
                className='register__btn btn btn-primary text-capitalize'>
                register
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Register;
