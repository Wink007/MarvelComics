import { fromJS } from 'immutable';
import {
  GET_CHARACTERS,
} from 'store/constants';

const initialState = fromJS({
  characters: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return state
        .set('characters', fromJS(action.data));
    default:
      return state;
  }
};

export default appReducer;