import axios from "axios"

const baseURL = "/api"
const axiosInstance = axios.create({
    // baseURL: 'your_base_url_here',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
/**
 * @return
 * @param {*} content 
 * @param {*} order 
 */
const postGPTCall = (content, order) =>{

    const apiURL = baseURL + '/statement/test_gpt/'
    const requestData = {
        "content": content,
        "order": order
    }

    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axiosInstance.post(apiURL, finaldata)
    .then(res =>{
        return (res)
    })
    .catch(error => {
        console.log(error)
        console.log('postGPTCall 실패!!!')
    })
}

export {postGPTCall}