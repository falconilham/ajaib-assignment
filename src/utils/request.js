import axios from 'axios'

const newAxios = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

async function getUser (params) {
  const response = await newAxios.get('',{
    params : {
      ...params,
      results: 10,
      pageSize: 10,
    }
  })
  return response.data
}

export {
  getUser
}