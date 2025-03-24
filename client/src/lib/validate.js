import axios from "axios";

export async function userCheck(user) {
    return axios.get("https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/customer").then(response => {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].username === user){
                return true
            }
        }
        return false   
    })
}

export async function accountCheck(id) {
    return axios.get(`https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/account/get/${id}`).then(response => {  
    if (response.data === null) {
            return false
        }
        return true   
    })
}

export async function emailCheck(email) {
    return axios.get("https://application-84.1te0ve55w7l8.us-east.codeengine.appdomain.cloud/customer").then(response => {
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].email === email){
                return true
            }
        }
        return false   
    })
}