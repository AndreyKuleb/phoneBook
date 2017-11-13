import {
    ADD_CONTACT,
    DELETE_CONTACT,
  } from './actions.js'

  import {baseData} from './info.js';

  let initialState = baseData;
  export default function contactsApp(state = initialState, action) {
    switch (action.type) {
        case DELETE_CONTACT:
            return Object.assign({}, state, state.filter((item) => {
                return item.name !== action.contactName;
            })
        );
        case ADD_CONTACT:
            return [...state, 
                {
                    name: action.newData.name,
                    telephone: action.newData.telephone,
                    city: action.newData.city
                }
            ];
        default:
            return state;
    }
}