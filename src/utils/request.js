import axios from 'axios'
// create an axios instance
const service = axios.create()
service.interceptors.request.use()
service.interceptors.response.use()
export default service
