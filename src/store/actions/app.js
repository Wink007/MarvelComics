import {
  GET_CHARACTERS,
  FETCH_CHARACTERS,
} from 'store/constants';

export const getCharacters = (data) => ({
  type: GET_CHARACTERS,
  data,
});

export const fetchCharacters = () => ({
  type: FETCH_CHARACTERS,
});