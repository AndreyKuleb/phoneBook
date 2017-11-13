/*
 * action types
 */

//export const SHOW_CONTACTS = 'SHOW_CONTACTS'
export const ADD_CONTACT = 'ADD_CONTACT'
export const DELETE_CONTACT = ' DELETE_CONTACT'


/*
 * action creators
 */

export function addContact(contact) {
  return { type: ADD_CONTACT, contact }
}

export function deleteContact(contactName) {
  return { type: DELETE_CONTACT, contactName }
}
