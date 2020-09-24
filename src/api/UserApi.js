const { default: RequestUtil } = require("../utils/RequestUtil");

const user_login_api = '/api/user/login'

 function userLogin(reqData){
    return RequestUtil('post', user_login_api, reqData);
}

export{
    userLogin
}