import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, FirebaseContext } from '../../../Firebase/Firebase';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormField from '../../shared/FormikField/FormikField';
import FormCheckboxInput from '../../shared/FormikCheckboxInput/ForminCheckboxInput';
import googleImage from '../../../assets/images/google.png';
import facebookImage from '../../../assets/images/facebook.png';
import twitterImage from '../../../assets/images/twitter.png';
import userImage from '../../../assets/images/user-img.png';
import './Login.scss';

const Login = () => {
  /* ---------------------------- start login auth ---------------------------- */
  const { auth, firebase } = useContext(FirebaseContext);
  const handleLoginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };
  const [error, setError] = useState('');
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

  const onSubmit = async (e) => {
    try {
      await auth.signInWithEmailAndPassword(e.email, e.password);
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
        console.log(formik);
        return (
          <Form>
            <section className='login__form container p-5 w-50'>
              <figure className='user__image w-25 mb-5'>
                <img className='w-100 rounded-circle' src={userImage} alt='' />
              </figure>
              <div className='form__wrapper w-75 mx-auto'>
                <div className='row'>
                  <FormField
                    name='email'
                    type='text'
                    label='email'
                    formType='login'
                    value={formik.values.email}
                  />
                  <FormField
                    name='password'
                    type='password'
                    label='password'
                    formType='login'
                    value={formik.values.password}
                  />
                  <div className='d-flex'>
                    <FormCheckboxInput
                      name='subscribeUs'
                      type='checkbox'
                      label='remember me'
                      // value={input.rememberMe}
                    />
                    <NavLink
                      to='#'
                      className='text-capitalize ms-auto text-white'>
                      forget password
                    </NavLink>
                  </div>
                  <button
                    type='submit'
                    className='login__btn btn btn-primary d-block mx-auto w-25 rounded-pill my-5 text-capitalize'
                    disabled={!formik.isValid}>
                    login
                  </button>
                  <button
                    type='submit'
                    className='logout__btn btn btn-danger d-block mx-auto w-25 rounded-pill my-5 text-capitalize'
                    onClick={() => auth.signOut()}>
                    logout
                  </button>
                  <p className='form__error'>{error}</p>
                </div>
              </div>
              <div className='form__decoration text-white d-flex justify-content-center align-items-center mb-5'>
                Or
              </div>
              <ul className='social__links list-unstyled d-flex mx-auto justify-content-around text-white w-50 '>
                <li className=''>
                  <NavLink className='' to='#' onClick={handleLoginWithGoogle}>
                    <figure className='mb-0'>
                      <img
                        className='w-100 rounded-circle'
                        src={googleImage}
                        alt=''
                      />
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
                      <img
                        className='w-100 rounded-circle'
                        src={twitterImage}
                        alt=''
                      />
                    </figure>
                  </NavLink>
                </li>
              </ul>
            </section>
            );
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
