import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { adminAddAction, adminEditAction } from '../../../store/cartActions';
import FormField from '../../shared/FormikField/FormikField';
import FormikSelectInput from '../../shared/FormikSelectInput/FormikSelectInput';
import * as yup from 'yup';
import './ProductForm.scss';

const ProductForm = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    let num = id;
    if (num !== 'new') {
      setInitialValues(
        fetchedData.products.filter((product) => product.id === +num)[0],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, initialValues]);

  const onSubmit = (values) => {
    //Add
    if (id === 'new') {
      //Call Backend
      dispatch(
        adminAddAction({ ...values, id: fetchedData.products.length + 1 }),
      );
      //Edit
    } else {
      //Call Backend
      let product = { ...values };
      delete product.id;
      dispatch(adminEditAction(initialValues.id, product));
    }
    navigate('/admin');
  };

  const validationSchema = yup.object({
    title: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    image: yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize>
      {(formik) => {
        return (
          <Form className='product__formWrapper'>
            <div className='product__form container py-3 mt-4'>
              <div className='form__productWrapper'>
                <div className='row'>
                  <FormField name='title' type='text' label='title' />
                  <FormField name='price' type='number' label='price' />
                  <FormField
                    name='description'
                    type='text'
                    label='description'
                  />
                  <FormikSelectInput
                    name='category'
                    type='text'
                    label='category'
                  />
                  <FormField name='image' type='text' label='image url' />
                  <div className='form__productBtn col-12 text-center mt-4'>
                    <Link
                      to='/admin'
                      className='product__backBtn text-warning rounded btn btn-outline-warning text-capitalize col'>
                      back to admin
                    </Link>
                    <button
                      type='submit'
                      disabled={!formik.isValid}
                      className='product__addBtn rounded btn btn-primary text-capitalize col ms-4'>
                      {id === 'new' ? 'add product' : 'edit product'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
