import {CITIES_LIST_FAILED, CITIES_LIST_REQUEST, CITIES_LIST_SUCCESS} from "../constatns/types";

const initialState = {
    loading: false,
    data: null,
    error: null
};

export const citiesListReducer = (state = initialState ,action) =>{
    switch (action.type) {
        case CITIES_LIST_REQUEST :
            return {
                loading: true,
                data: null,
                error: null
            };
        case CITIES_LIST_SUCCESS :
            return {
                loading: false,
                data: action.payload,
                error: null
            };
        case CITIES_LIST_FAILED :
            return {
                loading: false,
                data: null,
                error: action.payload
            };
        default:
            return state;
    }
}