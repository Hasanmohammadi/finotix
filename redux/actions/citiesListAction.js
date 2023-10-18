import Axios from "axios"
import {CITIES_LIST_FAILED, CITIES_LIST_REQUEST, CITIES_LIST_SUCCESS} from "../constatns/types";

export const citiesListAction = () => async (dispatch) =>{
    dispatch({
        type: CITIES_LIST_REQUEST
    })
    try {
        const apiUrl = "https://sairo-panel-api.sairosoft.com/V1.0/Place/CitiesList";
        const Token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiOUNGNTFBNUItQzIyQS00N0Y5LTg0QTctMEM0QUMzM0RGOEY3IiwibmJmIjoxNjU2ODMwMTE2LCJleHAiOjE2NTY5MTY1MTYsImlhdCI6MTY1NjgzMDExNiwiaXNzIjoiaHR0cHM6Ly9zYWlyb3NvZnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9zYWlyb3NvZnQuY29tIn0.jd0dc-7VGyOCM1RFORpELT4zTS1OA4jgXlyBeScwuemWW-xLdpQW9vzrpx9QkZXaEHpqtYvvtaIW0_5p0Zigew";
        const {data} = await Axios.get(apiUrl, {
            headers : {
                Authorization: 'Bearer ' + Token
            }})
        if (data){
            dispatch({
                type: CITIES_LIST_SUCCESS,
                payload: data
            })
        }
    } catch (e) {
        dispatch({
            type: CITIES_LIST_FAILED,
            payload: e.message
        })
    }}