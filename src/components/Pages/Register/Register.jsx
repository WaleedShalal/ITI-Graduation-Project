import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../../shared/FormikField/FormikField';
import FormRadioButton from '../../shared/FormikRadioButton/FormikRadioButton';
import FormCheckboxInput from '../../shared/FormikCheckboxInput/ForminCheckboxInput';
import { auth, db } from '../../../Firebase/Firebase';
import { updateProfile } from 'firebase/auth';
import * as yup from 'yup';
import './Register.scss';
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
  const classifyUsers = [
    {
      id: 1,
      value: 'normal user',
      label: 'normal user',
    },
    {
      id: 2,
      value: 'product owner',
      label: 'product owner',
    },
    {
      id: 3,
      value: 'blogger',
      label: 'blogger',
    },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    userBadge: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: [''],
    phoneNumber: '',
    website: '',
    followedHashtags: [],
    subscribeUs: false,
  };
  const validationSchema = yup.object({
    firstName: yup.string().required('Please enter a first name'),
    lastName: yup.string().required('Please enter a last name'),
    birthDate: yup.string().required('Please enter a birth date'),
    gender: yup.string().required('Please choose gender'),
    userBadge: yup.string().required('Please choose Badge'),
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
    address: yup.array().of(yup.string().required('Please enter an address')),
    followedHashtags: yup
      .array()
      .min(5, 'followedHashtags field must have at least 5 hashs')
      .of(yup.string().required('Please Five Hastags')),
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
      userBadge: role,
    } = e;

    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          updateProfile(auth.currentUser, {
            displayName: `${firstName}_${lastName}`,
          });
          return db
            .collection('users')
            .doc(cred.user.uid)
            .set({
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
              username: `${firstName}_${lastName}`,
              role,
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
      onSubmit={onSubmit}
      enableReinitialize={true}>
      {(formik) => {
        return (
          <section className='register__formWrapper pt-5'>
            <div className='container'>
              <div className='row'>
                <Form className='col-sm-10 col-md-9 col-lg-6 col-xl-7 mx-auto'>
                  <div className='background__overlay'></div>
                  <div className='register__form p-3 pb-0'>
                    <div className='form__wrapper'>
                      <div className='row'>
                        <FormField
                          name='firstName'
                          type='text'
                          label='first name'
                        />
                        <FormField
                          name='lastName'
                          type='text'
                          label='last name'
                        />
                        <FormField
                          name='birthDate'
                          type='date'
                          label='birth date'
                        />
                        <FormRadioButton
                          name='gender'
                          label='gender'
                          options={genderOption}
                        />
                        <FormField name='email' type='email' label='email' />
                        <FormRadioButton
                          name='userBadge'
                          label='userBadge'
                          options={classifyUsers}
                        />
                        <FormField
                          name='password'
                          type='password'
                          label='password'
                        />
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
                                  <div className='col-12' key={index}>
                                    <div className='row gx-0'>
                                      <FormField
                                        isRequired={true}
                                        name={`address[${index}]`}
                                        type='text'
                                        label={`address ${index + 1}`}
                                        colWidth='col-10'
                                      />
                                      <div className='address__btnWrapper col-2 d-flex justify-content-evenly'>
                                        <button
                                          type='button'
                                          className='address__addBtn  mb-1 rounded d-flex justify-content-center align-items-center btn btn-primary'
                                          onClick={() => push('')}>
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type='button'
                                            className='address__removeBtn mb-1 rounded d-flex justify-content-center align-items-center  btn btn-outline-danger'
                                            onClick={() => remove(index)}>
                                            -
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </>
                            );
                          }}
                        </FieldArray>
                        <FormField
                          isRequired={false}
                          name='phoneNumber'
                          type='text'
                          label='phone number'
                        />
                        <FormField
                          isRequired={false}
                          name='website'
                          type='text'
                          label='website'
                        />
                        <FieldArray name='followedHashtags'>
                          {(props) => {
                            const { push, form } = props;
                            const { values } = form;
                            let { followedHashtags } = values;
                            const hashTags = [
                              'fashion',
                              'art',
                              'sports',
                              'technology',
                              'cars',
                              'food',
                              'lifestyle',
                              'drawing',
                              'nature',
                              'travel',
                              'makeup',
                              'skincare',
                              'design',
                              'animals',
                              'animation',
                              'songs',
                            ];
                            const handleAddHash = (hash) => {
                              !followedHashtags.includes(`#${hash}`) &&
                                push(`#${hash}`);
                              // formik.setFieldValue(
                              //   'followedHashtags',
                              //   followedHashtags.toString().replace(/,/g, ' '),
                              // );
                            };
                            const handleRemoveHash = (e, hash) => {
                              e.stopPropagation();
                              let updatedFollowedHashtags =
                                followedHashtags.filter(
                                  (followedHashtag) =>
                                    followedHashtag !== `#${hash}`,
                                );
                              formik.setFieldValue(
                                'followedHashtags',
                                updatedFollowedHashtags,
                              );
                            };
                            return (
                              <>
                                <FormField
                                  name='followedHashtags'
                                  type='text'
                                  label='followed hashtags'
                                  isDisabled={true}
                                  colWidth=''
                                />
                                <div className='row'>
                                  <ul className='hashtags__list list-unstyled d-flex flex-wrap justify-content-evenly align-items-center my-3 col-sm-12 mx-auto'>
                                    {hashTags.map((hash) => {
                                      return (
                                        <li
                                          key={hash}
                                          onClick={() => handleAddHash(hash)}
                                          className={`${
                                            followedHashtags.includes(
                                              `#${hash}`,
                                            ) && 'hash__inList'
                                          } text-capitalize text-white m-1`}>
                                          <span>{hash}</span>
                                          {followedHashtags.includes(
                                            `#${hash}`,
                                          ) && (
                                            <i
                                              onClick={(e) =>
                                                handleRemoveHash(e, hash)
                                              }
                                              className='far fa-window-close ms-2'></i>
                                          )}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </>
                            );
                          }}
                        </FieldArray>
                        <FormCheckboxInput
                          name='subscribeUs'
                          type='checkbox'
                          label='subscribe us'
                        />
                        <div className='d-flex justify-content-evenly my-3'>
                          <button
                            type='submit'
                            disabled={!formik.isValid}
                            className='register__btn rounded w-25 btn btn-success text-capitalize'>
                            register
                          </button>
                        </div>
                        <div className='text-center'>
                          <span className='text-capitalize'>
                            already have account?{' '}
                          </span>
                          <Link className='text-capitalize' to='/login'>
                            sign in
                          </Link>
                        </div>
                        <p className='form__error'>{error}</p>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </section>
        );
      }}
    </Formik>
  );
}
export default Register;
