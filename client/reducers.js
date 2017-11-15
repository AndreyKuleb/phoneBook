import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'

  import {baseData} from './info.js';

  let initialState = baseData;
  export default function contactsApp(state = initialState, action) {
    switch (action.type) {
        case DELETE_CONTACT:
            console.log("something");
            console.log( ([...(state.filter((item) => { return item.name === action.contactName;}))]));
            return ([...(state.filter((item) => { return item.name !== action.contactName;}))]);
        case ADD_CONTACT:
            return [...state, action.contact
                // {
                //     name: action.name,
                //     telephone: action.telephone,
                //     city: action.city
                // }
            ];
        default:
            console.log("something2");
            return state;
    }
}