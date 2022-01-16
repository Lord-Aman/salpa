import axios from 'axios'

function setJwt(jwt){
    axios.default.headers.common["x-auth-token"] = jwt;
}

export default{
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete,
    setJwt
}