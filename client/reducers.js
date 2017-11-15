import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'

  import {baseData} from './info.js';

  let initialState = baseData;
  export default function contactsApp(state = initialState, action) {
    switch (action.type) {
        case DELETE_CONTACT:
            return ([...(state.filter((item) => { return item.name !== action.contactName;}))]);
        case ADD_CONTACT:
            return [...state, action.contact];
        default:
            return state;
    }
}