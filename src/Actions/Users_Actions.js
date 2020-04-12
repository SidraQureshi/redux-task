// All the crud options are here

export const ADD_USER = "[USERS] Add User";
export const EDIT_USER = "[USERS] EDIT User";
export const VIEW_USER = "[USERS] VIEW USER";
export const DELETE_USER = "[USERS] DELETE USER"

export const addUserAction = (data) => {
    return {
        type: ADD_USER,
        data: data
    };
 }

 export const editUserAction = (data) => {
    return {
        type: EDIT_USER,
        data: data
    };
 }

 export const viewUserAction = (data) => {
    return {
        type: VIEW_USER,
        data: data
    };
 }

 export const deleteUserAction = (data) => {
    return {
        type: DELETE_USER,
        data: data
    };
 }