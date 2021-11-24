import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminAddAction, adminEditAction } from '../../../store/cartActions';
import './ProductForm.scss';

const ProductForm = () => {
  const { fetchedData } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    image: '',
    description: '',
    category: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let num = id;
    if (num !== 'new') {
      setNewProduct(
        fetchedData.products.filter((product) => product.id === +num)[0],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleChange = (e) => {
    let { name, value, type } = e.target;
    console.log(name, type);
    setNewProduct({
      ...newProduct,
      count: 0,
      [name]: type === 'number' ? +value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Add
    if (id === 'new') {
      //Call Backend
      dispatch(
        adminAddAction({ ...newProduct, id: fetchedData.products.length + 1 }),
      );
      //Edit
    } else {
      //Call Backend
      let product = { ...newProduct };
      delete product.id;
      dispatch(adminEditAction(newProduct.id, product));
    }
    navigate('/admin');
  };
  return (
    <React.Fragment>
      <section className='product__form mt-5'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            {id !== 'new' && (
              <div className='form-group'>
                <label htmlFor='id'>ID</label>
                <input
                  type='number'
                  name='id'
                  id='id'
                  value={newProduct.id}
                  onChange={handleChange}
                  spellCheck='false'
                  className='form-control'
                  step='1'
                  autoComplete='off'
                  disabled
                />
              </div>
            )}
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                className='form-control'
                id='title'
                value={newProduct.title}
                onChange={handleChange}
                spellCheck='false'
                autoComplete='off'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price</label>
              <input
                type='number'
                name='price'
                id='price'
                value={newProduct.price}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                name='description'
                id='description'
                value={newProduct.description}
                onChange={handleChange}
                spellCheck='false'
                autoComplete='off'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='categorys'>Category</label>
              <select
                onChange={handleChange}
                name='category'
                value={newProduct.category}
                className='category-option form-control'
                id='categorys'>
                <option value='' disabled>
                  Select ---
                </option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
                <option value='jewelery'>jewelery</option>
                <option value='electronics'>electronics</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='image'>Image URL</label>
              <input
                type='text'
                name='image'
                id='image'
                spellCheck='false'
                autoComplete='off'
                value={newProduct.image}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className=' mt-4 text-center d-flex justify-content-between w-50 mx-auto'>
              <button className='text-capitalize btn btn-outline-warning w-25'>
                back to admin
              </button>
              <button
                type='submit'
                className='text-capitalize btn btn-primary w-25'>
                {id === 'new' ? 'confirm add' : 'confirm edit'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductForm;
