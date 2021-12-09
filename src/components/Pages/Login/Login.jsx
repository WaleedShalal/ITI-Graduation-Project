import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../../Firebase/Firebase';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormField from '../../shared/FormikField/FormikField';
import FormCheckboxInput from '../../shared/FormikCheckboxInput/ForminCheckboxInput';
import googleImage from '../../../assets/images/google.png';
import facebookImage from '../../../assets/images/facebook.png';
import twitterImage from '../../../assets/images/twitter.png';
import { toast } from 'react-toastify';
import './Login.scss';

const Login = () => {
  /* ---------------------------- start login auth ---------------------------- */
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();
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

  const onSubmit = async (e) => {
    try {
      await auth.signInWithEmailAndPassword(e.email, e.password);
      navigate('/home');
      toast.success(
        `Welcome Back ${e.email.substring(0, e.email.lastIndexOf('@'))}`,
      );
    } catch (err) {
      toast.error(err.message.slice(10, err.message.lastIndexOf('(')));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formik) => {
        return (
          <>
            <section className='login__page py-5'>
              <div className='page__overlay'></div>
              <div className='container-fluid'>
                <div className='row align-items-center'>
                  <Form className='login__formWrapper col-sm-8 col-md-6 col-lg-5 col-xl-5 mx-auto'>
                    <div className='login__form pb-3 px-5 w-100 mb-3'>
                      <div className='form__wrapper mx-auto pt-3 '>
                        <div className='row'>
                          <FormField
                            name='email'
                            type='text'
                            label='email'
                            value={formik.values.email}
                            colWidth='col-12'
                          />
                          <FormField
                            name='password'
                            type='password'
                            label='password'
                            formType='login'
                            value={formik.values.password}
                            colWidth='col-12'
                          />
                          <div className='sub__forgetWrapper d-flex align-items-baseline'>
                            <FormCheckboxInput
                              name='subscribeUs'
                              type='checkbox'
                              label='remember me'
                            />
                            <div className='forgot__linkWrapper ms-auto'>
                              <NavLink
                                to='#'
                                className='forgot__link text-capitalize  text-dark'>
                                forget password ?
                              </NavLink>
                            </div>
                          </div>
                          <button
                            type='submit'
                            className='login__btn btn btn-primary d-block mx-auto w-25 rounded mt-5  mb-3  text-capitalize'
                            disabled={!formik.isValid}>
                            <div className='mx-auto w-75'>login</div>
                          </button>
                          <div className='form__decoration text-dark col-12 d-flex justify-content-center align-items-center mb-4'>
                            Or
                          </div>
                        </div>
                      </div>
                      <ul className='social__links list-unstyled d-flex flex-column  mx-auto '>
                        <li className='w-100  py-1 my-1 '>
                          <div className='social__linksWrapper  mx-auto text-start'>
                            <NavLink
                              className='d-flex align-items-baseline'
                              to='#'>
                              <figure className='social__linksImage mb-0'>
                                <img
                                  className='w-100 rounded-circle'
                                  src={googleImage}
                                  alt=''
                                />
                              </figure>
                              <h6 className='text-capitalize text-dark ms-2'>
                                google
                              </h6>
                            </NavLink>
                          </div>
                        </li>
                        <li className='w-100  py-1 my-1'>
                          <div className=' social__linksWrapper mx-auto text-start'>
                            <NavLink
                              className='d-flex align-items-baseline'
                              to='#'>
                              <figure className='social__linksImage mb-0'>
                                <img
                                  className='w-100 rounded-circle'
                                  src={facebookImage}
                                  alt=''
                                />
                              </figure>
                              <h6 className='text-capitalize text-dark ms-2'>
                                facebook
                              </h6>
                            </NavLink>
                          </div>
                        </li>
                        <li className='w-100  py-1 my-1'>
                          <div className='social__linksWrapper  mx-auto text-start'>
                            <NavLink
                              className='d-flex align-items-baseline'
                              to='#'>
                              <figure className='social__linksImage mb-0'>
                                <img
                                  className='w-100 rounded-circle'
                                  src={twitterImage}
                                  alt=''
                                />
                              </figure>
                              <h6 className='text-capitalize text-dark ms-2'>
                                twitter
                              </h6>
                            </NavLink>
                          </div>
                        </li>
                      </ul>
                      <div className='text-center'>
                        <span className='text-capitalize'>
                          don't have account?{' '}
                        </span>
                        <Link className='text-capitalize' to='/register'>
                          join now
                        </Link>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </section>
          </>
        );
      }}
    </Formik>
  );
};

export default Login;
