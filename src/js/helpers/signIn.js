import axios from 'axios';

export default async function singIn(email, password) {
  const url = process.env.REACT_APP_API_URL;
  const data = {
    grant_type: 'password',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    username: email,
    password: password
  }

  return await axios.post(url + 'o/token/', data)
    .then(res => {
      return res;
    }).catch(error => {
      return {
        status: error.response.status,
        data: error.response.data
      }
    });
}