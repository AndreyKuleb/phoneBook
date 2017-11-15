/*
 * action types
 */

//export const SHOW_CONTACTS = 'SHOW_CONTACTS'
const ADD_CONTACT = 'ADD_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
export {ADD_CONTACT, DELETE_CONTACT}

//export const UPDATE_TABLE


// /*
//  * action creators
//  */

export function addContact(contact) {
  return { type: ADD_CONTACT, contact }
}

export function deleteContact(contactName) {
  return { type: DELETE_CONTACT, contactName }
}
