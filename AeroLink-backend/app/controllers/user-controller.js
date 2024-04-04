import * as userService from "../services/user-service.js";
import { setDataResponse, setDataErrorResponse } from './simple-response-handler.js'

// Controller for Discover API
export const getUser = async (request, response) => {
    try {
      const id = request.params.id;
      const user = await userService.getUser(id);
      console.log("getuser",user);
      setDataResponse({"type":"GET_USER_BY_ID","data":user}, response);
    } catch (error) {
        setDataErrorResponse(error, response)
    }
}
