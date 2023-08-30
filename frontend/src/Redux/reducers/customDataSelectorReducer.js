import {
  CLEAR_ERRORS,
  CUSTOM_DATA_SELECTOR_FAIL,
  CUSTOM_DATA_SELECTOR_REQUEST,
  CUSTOM_DATA_SELECTOR_SUCCESS,
  GET_PREVIOUS_SELECTED_YEAR_FAIL,
  GET_PREVIOUS_SELECTED_YEAR_REQUEST,
  GET_PREVIOUS_SELECTED_YEAR_SUCCESS,
} from "../constants/customDataSelectorConstants";

export const getpreviousSelectedYearReducer = (
  state = { getpreviousselectedyear: [] },
  action
) => {
  switch (action.type) {
    case GET_PREVIOUS_SELECTED_YEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_PREVIOUS_SELECTED_YEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        getpreviousselectedyear: action.payload,
      };

    case GET_PREVIOUS_SELECTED_YEAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const customDataSelectorReducer = (
  state = { customdataselector: [] },
  action
) => {
  switch (action.type) {
    case CUSTOM_DATA_SELECTOR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CUSTOM_DATA_SELECTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        customdataselector: action.payload.customdataselector,
      };

    case CUSTOM_DATA_SELECTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
