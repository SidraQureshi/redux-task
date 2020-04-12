// import actions
import {
    ADD_USER,
    EDIT_USER,
    VIEW_USER,
    DELETE_USER
} from '../Actions/Users_Actions';

// 1. fetch from localstorage
let x = localStorage.getItem("People");

// defining initial state
const initialState = {
    users: x ? JSON.parse(x) : []
};

// 3. definining default state to local storage
if (!x) {
    const People = []; //creating array
    localStorage.setItem("People", JSON.stringify(People)) // setting people array in local storage and stringify the object    
}

// defining reducers
export const userReducer = function (state = initialState, action) {
    switch(action.type) {
        
        case ADD_USER:
            action.data.id = (new Date()).getTime();
            state.users.push(action.data);

            // setting it to local storage
            localStorage.setItem('People', JSON.stringify(state.users));

            return {...state};

        case DELETE_USER:
             // fetch users
            let selectedInd = -1;
            state.users.forEach((u, ind) => {
                if (u.id === action.data.id) {
                    selectedInd = ind;
                }
            });
            // remove user
            state.users.splice(selectedInd, 1);

            // setting to localstorage
            localStorage.setItem('People', JSON.stringify(state.users));

            return {...state};

        case EDIT_USER:
             // fetch users
             
             let selectedIndex = -1;
             state.users.forEach((u, ind) => {
                 // checking that selected id is present in the array of objects
               if (u.id === action.data.id) {
                   //taking selected object index on the basis of object id
                   selectedIndex = ind;
               }
             });
             state.users[selectedIndex] = action.data;
             const somerec = {...state};
             // setting to local storage
             localStorage.setItem('People', JSON.stringify(state.users));
             return somerec;

         case VIEW_USER:
             return {...state};

             default:
            return {...state}

    }
}