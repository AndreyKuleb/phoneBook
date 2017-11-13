import {
    ADD_CONTACT,
    DELETE_CONTACT,
  } from './actions.js'

  export default function contactsApp(state = initialState, action) {
    switch (action.type) {
        case DELETE_CONTACT:
            return Object.assign({}, state, state.filter((item) => {
                return item.name !== action.contactName;
            })
        );
        case ADD_CONTACT:
            return [...state, action.contact];
        default:
            return state;
    }
}