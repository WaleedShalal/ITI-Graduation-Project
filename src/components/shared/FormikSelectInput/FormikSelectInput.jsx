import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Field } from 'formik';
import FormErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikSelectInput.scss';

function FormikSelectInput({ isRequired, name, type, label, formType }) {
  const { id } = useParams();
  const { fetchedData } = useSelector((state) => state);
  // const [newProduct, setNewProduct] = useState({
  //   id: '',
  //   title: '',
  //   price: '',
  //   image: '',
  //   description: '',
  //   category: '',
  // });

  // useEffect(() => {
  //   let num = id;
  //   if (num !== 'new') {
  //     setNewProduct(
  //       fetchedData.products.filter((product) => product.id === +num)[0],
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <div className='form-group'>
            <label htmlFor={name} className='text-dark text-capitalize mt-3'>
              {label} {isRequired && <span className='text-danger'>*</span>}
            </label>
            <select
              className='w-100 ps-2 mb-1'
              type={type}
              id={name}
              {...formikField.field}
              defaultChecked={formikField.field.initialValues}>
              <option value='' disabled>
                Select ---
              </option>
              <option value="men's clothing">men's clothing</option>
              <option value="women's clothing">women's clothing</option>
              <option value='jewelery'>jewelery</option>
              <option value='electronics'>electronics</option>
            </select>
            <div className=''>
              <FormErrorMessage name={name} />
            </div>
          </div>
        );
      }}
    </Field>
  );
}

export default FormikSelectInput;
