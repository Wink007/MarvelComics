// Core
import {
  takeLatest, call, put,
} from 'redux-saga/effects';

// Custom
import request from 'utils/request';
import {
  getCharacters,
} from 'store/actions';
import { FETCH_CHARACTERS } from 'store/constants';
import md5 from 'crypto-js/md5';

export function* fetchCharacters() {
  const ts = new Date().getTime();
  const PUBLIC_KEY = '58c68b967ccf929face99d4b6954e245';
  const { REACT_APP_KEY } = process.env;
  const hash = md5(ts + REACT_APP_KEY + PUBLIC_KEY);

  const apiUrl = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&offset=20`;

  const { result, error } = yield call(request, apiUrl);

  if (error || result.error) {
    console.log('error');
  } else {
    yield put(getCharacters(result.data));
  }
}

export function* watchGetCharacters() {
  yield takeLatest(FETCH_CHARACTERS, fetchCharacters);
}

export default watchGetCharacters;