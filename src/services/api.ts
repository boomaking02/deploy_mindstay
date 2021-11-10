import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_HTTP_BASIC_USER || '',
    password: process.env.NEXT_PUBLIC_HTTP_BASIC_PASSWORD || '',
  },
});
