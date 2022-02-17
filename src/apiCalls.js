import publicRequest from "./requestMethods";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
    
        const res = await publicRequest.post("auth/auth_ma.php", JSON.stringify({username: userCredentials.username,password:  userCredentials.password}));

        await dispatch({type: "LOGIN_SUCCESS", payload:res.data});
        
        await localStorage.setItem("eisenmann_mitarbeiter", JSON.stringify(res.data))


    }catch(err) {
        dispatch({type: "LOGIN_FAILURE", payload:err});
    }
}


export const logout = (dispatch) =>{

    localStorage.removeItem("eisenmann_mitarbeiter");
    dispatch({type: "LOGOUT"});
}

