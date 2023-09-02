import axios from "axios"
import instance from "./Instance";
const test = 123;
const baseURL = "/api"

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
    return instance.post(apiURL, finaldata)
    .then(res =>{
        return (res)
    })
    .catch(error => {
        console.log(error)
        console.log('postGPTCall 실패!!!')
    })
}

export {postGPTCall}