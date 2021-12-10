import * as actionsTypes from './cartTypes';

const initialState = {
  loading: false,
  products: localStorage.getItem('products')
    ? JSON.parse(localStorage.getItem('products'))
    : [],
  filter: localStorage.getItem('filter')
    ? JSON.parse(localStorage.getItem('filter'))
    : [],
  purchased: localStorage.getItem('purchased')
    ? JSON.parse(localStorage.getItem('purchased'))
    : [],
  sortValue: localStorage.getItem('sortValue')
    ? JSON.parse(localStorage.getItem('sortValue'))
    : 'latest',
  filterValue: localStorage.getItem('filterValue')
    ? JSON.parse(localStorage.getItem('filterValue'))
    : 'all',
  minPrice: '',
  maxPrice: '',
  errors: '',
};

/* ----------------------------- start functions ---------------------------- */

/* ----------------------------- end functions ---------------------------- */
const handleSort = (actionFilter, actionValue, state) => {
  let filter = actionFilter;
  switch (actionValue) {
    case 'lowest': {
      filter = filter.sort((a, b) => a.price - b.price);
      localStorage.setItem('sortValue', JSON.stringify(actionValue));
      localStorage.setItem('filter', JSON.stringify(filter));
      return { ...state, filter, sortValue: actionValue };
    }
    case 'highest': {
      filter = filter.sort((a, b) => b.price - a.price);
      localStorage.setItem('sortValue', JSON.stringify(actionValue));
      localStorage.setItem('filter', JSON.stringify(filter));
      return { ...state, filter, sortValue: actionValue };
    }
    default: {
      filter = filter.sort((a, b) => a.id - b.id);
      localStorage.setItem('sortValue', JSON.stringify(actionValue));
      localStorage.setItem('filter', JSON.stringify(filter));
      return { ...state, filter, sortValue: actionValue };
    }
    // default:
    //   localStorage.setItem('sortValue', JSON.stringify(actionValue));
    //   localStorage.setItem('filter', JSON.stringify(filter));
    //   return state;
  }
};
const handleFilter = (actionProduct, actionValue, state) => {
  let products = actionProduct;
  switch (actionValue) {
    case 'all': {
      localStorage.setItem('filterValue', JSON.stringify(actionValue));
      localStorage.setItem('filter', JSON.stringify(products));
      const sortting = handleSort(products, state.sortValue, state);
      return { ...state, filter: sortting.filter, filterValue: actionValue };
    }
    default: {
      products = products.filter((p) => p.category === actionValue);
      localStorage.setItem('filterValue', JSON.stringify(actionValue));
      localStorage.setItem('filter', JSON.stringify(products));
      const sortting = handleSort(products, state.sortValue, state);
      return { ...state, filter: sortting.filter, filterValue: actionValue };
    }
  }
};
/* ---------------------------- start price input --------------------------- */
export const fetchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case actionsTypes.FETCH_PRODUCTS_SUCCESS:
      localStorage.setItem('filter', JSON.stringify(action.items));
      localStorage.setItem('products', JSON.stringify(action.items));
      return {
        ...state,
        loading: false,
        products: action.items,
        filter: action.items,
        errors: '',
      };
    case actionsTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        filter: [],
        errors: action.errors,
      };
    case actionsTypes.ADD_CART: {
      //Clone
      let purchased = [...state.purchased];
      // Edit
      let inCart = false;
      purchased.forEach((item) => {
        if (item.id === action.item.id) {
          item.count++;
          inCart = true;
        }
      });
      if (!inCart) {
        purchased.push({ ...action.item, count: 1 });
      }
      localStorage.setItem('purchased', JSON.stringify(purchased));
      return { ...state, purchased };
    }
    case actionsTypes.REMOVE_CART: {
      //Clone
      let purchased = [...state.purchased];
      //Edit
      purchased = purchased.filter((item) => item.id !== action.item.id);
      localStorage.setItem('purchased', JSON.stringify(purchased));
      return { ...state, purchased };
    }
    case actionsTypes.REMOVE_ALL_CART: {
      //Clone
      let purchased = [...state.purchased];
      //Edit
      purchased = [];
      localStorage.setItem('purchased', JSON.stringify(purchased));
      return { ...state, purchased };
    }
    case actionsTypes.SORT_VALUE: {
      // let filter = action.filter;
      // switch (action.value) {
      //   case 'lowest': {
      //     filter = filter.sort((a, b) => a.price - b.price);
      //     localStorage.setItem('sortValue', JSON.stringify(action.value));
      //     localStorage.setItem('filter', JSON.stringify(filter));
      //     return { ...state, filter, sortValue: action.value };
      //   }
      //   case 'highest': {
      //     filter = filter.sort((a, b) => b.price - a.price);
      //     localStorage.setItem('sortValue', JSON.stringify(action.value));
      //     localStorage.setItem('filter', JSON.stringify(filter));
      //     return { ...state, filter, sortValue: action.value };
      //   }
      //   case 'latest': {
      //     filter = filter.sort((a, b) => a.id - b.id);
      //     localStorage.setItem('sortValue', JSON.stringify(action.value));
      //     localStorage.setItem('filter', JSON.stringify(filter));
      //     return { ...state, filter, sortValue: action.value };
      //   }
      //   default:
      //     localStorage.setItem('sortValue', JSON.stringify(action.value));
      //     localStorage.setItem('filter', JSON.stringify(filter));
      //     return state;
      // }
      // default:
      return handleSort(action.filter, action.value, state);
    }
    case actionsTypes.FILTER_VALUE: {
      // let products = action.product;
      // switch (action.value) {
      //   case 'all': {
      //     localStorage.setItem('filterValue', JSON.stringify(action.value));
      //     localStorage.setItem('filter', JSON.stringify(products));

      //     return { ...state, filter: products, filterValue: action.value };
      //   }
      //   default: {
      //     products = products.filter((p) => p.category === action.value);
      //     localStorage.setItem('filterValue', JSON.stringify(action.value));
      //     localStorage.setItem('filter', JSON.stringify(products));
      //     return { ...state, filter: products, filterValue: action.value };
      //   }
      // }
      return handleFilter(action.product, action.value, state);
    }
    case actionsTypes.PRICE_VALUE: {
      let data = [];
      if (state.filterValue !== 'all') {
        // if (state.filterValue !== 'all' && state.filterValue) {
        data = state.products.filter(
          (product) => product.category === state.filterValue,
        );
      } else {
        data = state.products;
      }
      let products = data.filter(
        (product) =>
          product.price >= action.min && product.price <= action.max && product,
      );
      state.sortValue === 'latest'
        ? products.sort((a, b) => a.id - b.id)
        : state.sortValue === 'lowest'
        ? products.sort((a, b) => a.price - b.price)
        : products.sort((a, b) => b.price - a.price);
      return {
        ...state,
        filter: products,
        minPrice: action.min,
        maxPrice: action.max,
      };
    }
    case actionsTypes.RESET_CART: {
      //Clone
      let purchased = [...state.purchased];
      //Edit
      purchased = purchased.map((pur) => {
        pur.count = 1;
        return pur;
      });
      return { ...state, purchased };
    }
    case actionsTypes.ITEM_QUANTITY: {
      //Clone
      let purchased = [...state.purchased];
      let index = purchased.indexOf(action.item);
      purchased[index] = { ...purchased[index] };
      //Edit
      if (action.name === 'increase') {
        purchased[index].count++;
      } else if (action.name === 'decrease' && purchased[index].count > 0) {
        purchased[index].count--;
      }
      return { ...state, purchased };
    }
    case actionsTypes.DELETE_PRODUCT: {
      let products = state.products.filter((p) => p.id !== action.item.id);
      localStorage.setItem('filter', JSON.stringify(products));
      localStorage.setItem('products', JSON.stringify(products));
      return { ...state, products, filter: products };
    }
    case actionsTypes.EDIT_PRODUCT: {
      let products = state.products.filter((p) => p.id !== action.itemId);
      products.push(action.editedItem);
      products = products.sort((a, b) => a.id - b.id);
      localStorage.setItem('filter', JSON.stringify(products));
      localStorage.setItem('products', JSON.stringify(products));
      return { ...state, products, filter: products };
    }
    case actionsTypes.ADD_PRODUCT: {
      let products = [...state.products];
      products.push(action.newProduct);
      products = products.sort((a, b) => a.id - b.id);
      localStorage.setItem('filter', JSON.stringify(products));
      localStorage.setItem('products', JSON.stringify(products));
      return { ...state, products, filter: products };
    }
    default:
      return state;
  }
};
