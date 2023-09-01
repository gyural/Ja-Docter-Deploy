import axios from "axios"

const baseURL = "/api"
const axiosInstance = axios.create({
    // baseURL: 'your_base_url_here',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

// GET APIs

/**
 * @return user의 모든 statement List형태로 리턴
 * @param NONE
 * user의 Statement리스트를 리턴한다!!!
 * 실패시 콘솔창에 실패메시지 + error코드 뜸
 */
const getStatementList = () =>{
    const apiURL = baseURL + `/statement/`

    return axiosInstance.get(apiURL)
    .then(response =>{
        console.log(response.data)
        return(response)
    }    
    )
    .catch(error => {
        console.log(error)
        console.log('getStatementList 실패!!!')
    })
}
/**
 * @param statementID (num)
 * @return parm으로 받은 statementID에 해당하는statment를 리턴한다!!!
 *
 */
const getStatement = async (statementID) => {
    const apiURL = baseURL + `/statement/${statementID}/`;

    return axiosInstance.get(apiURL, statementID)
    .then(response =>{
        return(response)
    })
    .catch(error =>{
        console.log(error)
        console.log('getStatement실패!!')
    })
};
/**
 * @param statementID (num)
 * @return statementID에 해당하는statment의 post를 배열형태로 모두 리턴한다!!!
 * 실패시 콘솔창에 실패메시지 + error코드뜸
 */
const getPostList = (statementID) => {
    const apiURL = baseURL + `/statement/${statementID}/post/`

    return axiosInstance.get(apiURL)
    .then(response =>{
        return(response)
    }    
    )
    .catch(error => {
        console.log(error)
        console.log('getPostList 실패!!!')
    })
}


// PUt APIs

/**
 * 매개변수로 받은 key에 해당하는 post의 content와 versionInfo로 수정함
 * @return updating post objcet
 * @param statementID 
 * @param postID 
 * @param content 
 * @param versionInfo
 * 
 *  
 */
const updatePost = (statementID, postID, content,versionInfo) => {
    const apiURL = baseURL + `/statement/${statementID}/post/${postID}/`;
    const requestData = {
        "content": content,
        "version_info": versionInfo
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axiosInstance.put(apiURL, finaldata)
    .then(response =>{
        return(response)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })
    
}
/**
 * Statement를 update하는 함수
 * @return statment.title
 * @param {} statementID 
 * @param {} title 
 * 
 */
const updateStatement = (statementID, title) => {
    const apiURL = baseURL + `/statement/${statementID}/`;
    const requestData = {
        "title": title
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axiosInstance.put(apiURL, finaldata)
    .then(response =>{
        return(response)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })
}
// Post APIs

/**
 * @return POST요청으로 만든 post객체 data 리턴!!
 * @param {*} statementID 
 * @param {*} content 
 * @param {*} versionInfo 
 */
const createpost = (statementID, content, versionInfo) => {
    const apiURL = baseURL + `/statement/${statementID}/post/`;
    const requestData = {
        "content": content,
        "version_info": versionInfo
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axiosInstance.post(apiURL, finaldata)
    .then(response =>{
        return(response)
    })
    .catch(error => {
        console.log(error)
        console.log('updatePost 실패!!!')
    })


}
/**
 * @return reponse.data로 statment.title과 post객체정보 리턴
 * @param {*} title 
 * @param {*} content 
 * @param {*} versionInfo
 */
const createStatement = (title, content, versionInfo) => {
    const apiURL = baseURL + `/statement/`;
    const requsePost = {
        "content": content
    }
    
    const requestData = {
        "title": title,
        "posts": [requsePost],
        "versionInfo" : versionInfo 
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axiosInstance.post(apiURL, finaldata)
    .then(response =>{
        return(response.data)
    })
    .catch(error => {
        console.log(error)
        console.log('statementCreate 실패!!!')
    })
    
}
//delete APIs
/**
 * @returns NONe
 * @param {*} statementID 
 * @param {*} title 
 */
const deleteStatement = (statementID, title) => {
    const apiURL = baseURL + `/statement/${statementID}/`;
    const requestData = {
        "title": title,
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axiosInstance.delete(apiURL, finaldata)
    .then(response =>{
        return(response)
    })
    .catch(error => {
        console.log(error)
        console.log('statementCreate 실패!!!')
    })
}   

export {getPostList, getStatement, getStatementList,
    updatePost,  updateStatement, 
    createpost, createStatement, deleteStatement}


