import axios from 'axios';
import { BOOK, MOVIE } from './types';

export function callMovieAPI(dataTosubmit) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/movieAPI',
      params: dataTosubmit,
    }).then((res) => {
      console.log('movieactionfunction', res.data);

      resolve({
        type: MOVIE,
        payload: res.data,
      });
    });
  });
}

export function callBookAPI(dataTosubmit) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/bookAPI',
      params: dataTosubmit,
    }).then((res) => {
      console.log('bookactionfunction', res.data);

      resolve({
        type: BOOK,
        payload: res.data,
      });
    });
  });
}