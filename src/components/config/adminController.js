import { publicAxios,privateReq } from "./apiConfig";

//fetching users
function doFetchUsers(){
    return publicAxios.get("/admin/fetchusers")
}

//blocking users
async function doBlockUsers(email,status) {
    let response;
    try {
        if(status==0)
       response = await privateReq.get("/admin/blockunbock?email=" + email+"&status="+1);
    else
     response = await privateReq.get("/admin/blockunbock?email=" + email+"&status="+0);

      return response;
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  }

export {doFetchUsers,doBlockUsers};
