export const INITIATE_CONTACTS = "initiate_contact"
export const INITIATE_CONTACT_SUCCESS = "initiate_success_contact"
export const INITIATE_CONTACT_ERROR = "initiate_error_contact"

export const UPDATE_CONTACT = "update_contact"
export const UPDATE_CONTACT_SUCCESS = "update_contact_success"
export const UPDATE_CONTACT_ERROR = "update_contact_error"

export const DELETE_CONTACT = "delete_contact"
export const DELETE_CONTACT_SUCCESS = "delete_contact_success"
export const DELETE_CONTACT_ERROR = "delete_contact_error"

function InitiateContacts(){
    return{
        type: INITIATE_CONTACTS
    }
}
function InitiateContactsSuccess(contacts){
    return{
        type: INITIATE_CONTACT_SUCCESS,
        data: contacts
    }
}
function InitiateContactsError(error){
    return{
        type: INITIATE_CONTACT_ERROR,
        error
    }
}

function UpdateContact(newcontact, id){
    return{
        type: UPDATE_CONTACT,
        data: {
            newcontact,
            id
        }
    }
}
function UpdateContactSuccess(newcontact){
    return{
        type: UPDATE_CONTACT_SUCCESS,
        data: {
            newcontact
        }
    }
}
function UpdateContactError(error){
    return{
        type: UPDATE_CONTACT_ERROR,
        error
    }
}

function DeleteContact(id){
    return{
        type: DELETE_CONTACT,
        data: id
    }
}
function DeleteContactSuccess(contact){
    return{
        type: DELETE_CONTACT_SUCCESS,
        data: contact
    }
}
function DeleteContactError(error){
    return{
        type: DELETE_CONTACT_ERROR,
        error
    }
}

function ClearContacts(){
    return{
        type: 'CLEAR_CONTACTS'
    }
}

export { InitiateContacts, InitiateContactsSuccess, InitiateContactsError, 
        UpdateContact, UpdateContactSuccess, UpdateContactError, 
        DeleteContact, DeleteContactSuccess, DeleteContactError,
        ClearContacts }