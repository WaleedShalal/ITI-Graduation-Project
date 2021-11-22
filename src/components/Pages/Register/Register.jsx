import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import FormField from '../../shared/FormikField/FormikField';
import FormRadioButton from '../../shared/FormikRadioButton/FormikRadioButton';
import FormCheckboxInput from '../../shared/FormikCheckboxInput/ForminCheckboxInput';
import userImage from '../../../assets/images/user-img.png';
import { auth, db } from '../../../Firebase/Firebase';
import { updateProfile } from 'firebase/auth';
import * as yup from 'yup';
import './Register.scss';
import FormikImageInput from './../../shared/FormikImageInput/FormikImageInput';
function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
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
    firstName: yup.string().required('Please enter a first name'),
    lastName: yup.string().required('Please enter a last name'),
    birthDate: yup.string().required('Please enter a birth date'),
    gender: yup.string().required('Please choose gender'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Please enter email'),
    password: yup
      .string()
      .min(8, 'Password must me at least 8 characters')
      .required('Please enter password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Password must be matched')
      .required(),
    phoneNumber: yup.string().required('Please enter a phone number'),
    website: yup.string(),
    followedHashtags: yup.string().required('Please enter five hashtags'),
  });

  const onSubmit = async (e) => {
    const {
      address,
      birthDate,
      confirmPassword,
      email,
      firstName,
      followedHashtags,
      gender,
      lastName,
      password,
      phoneNumber,
      subscribeUs,
      website,
    } = e;
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
          });
          return db.collection('users').doc(cred.user.uid).set({
            id: cred.user.uid,
            address,
            birthDate,
            confirmPassword,
            email,
            firstName,
            followedHashtags,
            gender,
            lastName,
            password,
            phoneNumber,
            subscribeUs,
            website,
          });
        });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form>
            <div className='register__form container p-5 w-50'>
              <figure className='user__image w-25'>
                <img className='w-100 rounded-circle' src={userImage} alt='' />
              </figure>
              <div className='form__wrapper'>
                <div className='row'>
                  <FormField name='firstName' type='text' label='first name' />
                  <FormField name='lastName' type='text' label='last name' />
                  <FormField name='birthDate' type='date' label='birth date' />
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
                                name={`address${index}`}
                                type='text'
                                label={`address ${index + 1}`}
                              />
                              <div className='col-2 d-flex justify-content-evenly'>
                                <button
                                  type='button'
                                  className='address__btn mb-1 rounded-circle d-flex justify-content-center align-items-center btn btn-primary'
                                  onClick={() => push('')}>
                                  +
                                </button>
                                {index > 0 && (
                                  <button
                                    type='button'
                                    className='address__btn mb-1 rounded-circle d-flex justify-content-center align-items-center  btn btn-danger'
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
                  {/* <FormikImageInput
                    name='profileImage'
                    type='file'
                    label='profile image'
                  /> */}
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
                  <p className='form__error'>{error}</p>
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
