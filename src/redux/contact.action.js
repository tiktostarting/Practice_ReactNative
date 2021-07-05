const InitiateContacts = (contacts) => {
    return{
        type: 'INITIATE_CONTACTS',
        data: contacts
    }
}

const AddContacts = (contacts) => {
    return{
        type: 'ADD_CONTACTS',
        data: contacts
    }
}

const UpdateContacts = (contacts) => {
    return{
        type: 'UPDATE_CONTACTS',
        data: contacts
    }
}

const DeleteContacts = (contacts) => {
    return{
        type: 'DELETE_CONTACTS',
        data: contacts
    }
}

export {InitiateContacts, AddContacts, UpdateContacts, DeleteContacts}