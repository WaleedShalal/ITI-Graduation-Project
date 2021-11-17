import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import googleImage from '../../../assets/images/google.png';
import facebookImage from '../../../assets/images/facebook.png';
import twitterImage from '../../../assets/images/twitter.png';
import userImage from '../../../assets/images/user-img.png';
import './Login.scss';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please Enter A Valid Email')
      .required('Please Enter Email'),
    password: yup
      .string()
      .min(8, 'Password Must Be At Least 8 Characters')
      .required('Please Enter Password'),
  });
  const onSubmit = (values) => alert(`Welcome "${values.email}""`);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <section className='login__form p-3 w-50 mx-auto'>
      <figure className='user__image w-25 mb-5'>
        <img className='w-100 rounded-circle' src={userImage} alt='' />
      </figure>
      <form onSubmit={formik.handleSubmit} className='mt-5'>
        <div className='login__wrapper d-flex flex-column align-items-center p-5'>
          <label
            htmlFor='email'
            className='w-50 mx-auto text-white text-capitalize'>
            email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            {...formik.getFieldProps('email')}
            className='input__style w-50 mx-auto mb-3 p-1'
          />

          {formik.touched.email && formik.errors.email && (
            <div className='error__message px-2 w-50 bg-warning text-danger'>
              {formik.errors.email}
            </div>
          )}

          <label
            htmlFor='password'
            className='w-50 mx-auto text-white text-capitalize'>
            password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            {...formik.getFieldProps('password')}
            className='input__style w-50 mx-auto mb-3 p-1'
          />
          {formik.touched.password && formik.errors.password && (
            <div className='error__message px-2 w-50 bg-warning text-danger'>
              {formik.errors.password}
            </div>
          )}
          <div className='d-flex w-50 mt-2  align-items-baseline'>
            <input
              type='checkbox'
              id='rememberMe'
              name='rememberMe'
              defaultChecked={formik.values.rememberMe}
              {...formik.getFieldProps('rememberMe')}
              className='checkbox__input input__style mb-3'
            />
            <label
              htmlFor='rememberMe'
              className='text-white text-capitalize ps-2'>
              remember me
            </label>
            <NavLink href='#' className='text-capitalize ms-auto text-white'>
              forget password
            </NavLink>
          </div>
          <button
            type='submit'
            className='login__btn btn btn-primary d-block mx-auto rounded-pill mt-5 text-capitalize'
            disabled={!formik.isValid}>
            login
          </button>
        </div>
      </form>
      <div className='form__decoration text-white d-flex justify-content-center align-items-center mb-5'>
        Or
      </div>
      <ul className='social__links list-unstyled d-flex mx-auto justify-content-around text-white w-50 '>
        <li className=''>
          <NavLink className='' to='#'>
            <figure className='mb-0'>
              <img className='w-100 rounded-circle' src={googleImage} alt='' />
            </figure>
          </NavLink>
        </li>
        <li>
          <NavLink to='#'>
            <figure className='mb-0'>
              <img
                className='w-100 rounded-circle'
                src={facebookImage}
                alt=''
              />
            </figure>
          </NavLink>
        </li>
        <li>
          <NavLink to='#'>
            <figure className='mb-0'>
              <img className='w-100 rounded-circle' src={twitterImage} alt='' />
            </figure>
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Login;
