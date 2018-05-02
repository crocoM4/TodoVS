import { callApi } from '../utils/ApiUtils';
import {
  REQUEST_FETCH_ALL_CATEGORIES,
  RECEIVE_FETCH_ALL_CATEGORIES,
  ERROR_FETCH_ALL_CATEGORIES,
  ADD_CATEGORY_LOCAL,
  REMOVE_CATEGORY_LOCAL,
  TOOGLE_SELECT_CATEGORY,
  TOOGLE_SELECT_CATEGORY_ALL,
} from '../constants/actionTypes';
import { fetchTodoArgumentsByCategory } from './todoArgumentsActions';
import { showMessageError } from './messageActions';
import categoryAll from '../constants/config';

const requestFetchAllCategories = () => (
  {
    type: REQUEST_FETCH_ALL_CATEGORIES,
  }
);

const receiveFetchAllCategories = categories => (
  {
    type: RECEIVE_FETCH_ALL_CATEGORIES,
    categories,
  }
);

const errorFetchAllCategories = error => (
  {
    type: ERROR_FETCH_ALL_CATEGORIES,
    error,
  }
);

const addCategoryLocal = category => (
  {
    type: ADD_CATEGORY_LOCAL,
    category,
  }
);

const removeCategoryLocal = categoryIndex => (
  {
    type: REMOVE_CATEGORY_LOCAL,
    categoryIndex,
  }
);

export const toogleSelectCategory = selectedCategory => (
  {
    type: TOOGLE_SELECT_CATEGORY,
    selectedCategory,
  }
);

export const toogleSelectCategoryAll = () => (
  {
    type: TOOGLE_SELECT_CATEGORY_ALL,
  }
);

export const fetchAllCategories = () => (dispatch) => {
  dispatch(requestFetchAllCategories());
  const request = callApi('/fetch-all-categories');
  return request.then(
    (response) => {
      if (response.success) {
        dispatch(receiveFetchAllCategories(response.data));
        dispatch(fetchTodoArgumentsByCategory(categoryAll.id));
      } else {
        dispatch(errorFetchAllCategories(response.messageError));
      }
    },
    error => (
      dispatch(showMessageError(error))
    ),
  );
};

export const deleteCategory = (categoryId = '') => (dispatch, getState) => {
  const request = callApi('/delete-category', { categoryId });
  return request.then(
    (response) => {
      if (response.success) {
        const { categories } = getState().todoFilters;
        const categoryIndex = categories.findIndex(category => category.id === categoryId);
        dispatch(removeCategoryLocal(categoryIndex));
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => (
      dispatch(showMessageError(error))
    ),
  );
};

/**
 * Request to add a category
 * @param {String} name category name to add
 * @param {Function} callback function that need to handle the category created
 */
export const addCategory = (name = '', callback = undefined) => (dispatch) => {
  const request = callApi('/add-category', { name });
  return request.then(
    (response) => {
      if (response.success) {
        dispatch(addCategoryLocal(response.data));
        if (callback !== undefined) {
          callback(response.data);
        }
      } else {
        dispatch(showMessageError(response.messageError));
      }
    },
    error => (
      dispatch(showMessageError(error))
    ),
  );
};