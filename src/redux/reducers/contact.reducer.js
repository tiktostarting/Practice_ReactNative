import {
    INITIATE_CONTACTS, INITIATE_CONTACT_SUCCESS, INITIATE_CONTACT_ERROR,
    UPDATE_CONTACT, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_ERROR,
    DELETE_CONTACT, DELETE_CONTACT_ERROR, DELETE_CONTACT_SUCCESS
} from "../actions/contact.action"

const initState = {
    data: [],
    loading: false,
    error: undefined,
    dataUpdate: {},
    dataDelete: {}
}

const ContactReducer = (state = initState, action) => {
    switch (action.type) {
        case INITIATE_CONTACTS:
            return {
                ...state, loading: true
            }
        case INITIATE_CONTACT_SUCCESS:
            return {
                ...state, data: action.data, loading: false
            }
        case INITIATE_CONTACT_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        case 'CLEAR_CONTACTS':
            return {
                ...state, data: []
            }
        case UPDATE_CONTACT:
            return {
                ...state
            }
        case UPDATE_CONTACT_SUCCESS:
            const Contacts = [...state.data]
            const newContacts = Contacts.map(contact => {
                if (contact.id === action.data.newcontact.id) {
                    contact.age = action.data.newcontact.age
                    contact.firstName = action.data.newcontact.firstName
                    contact.lastName = action.data.newcontact.lastName
                    contact.photo = action.data.newcontact.photo
                }
                return contact
            })
            return {
                ...state, data: newContacts
            }
        case UPDATE_CONTACT_ERROR:
            return {
                ...state, error: action.error
            }
        case DELETE_CONTACT:
            return {
                ...state
            }
        case DELETE_CONTACT_SUCCESS:
            const contactsBefore = [...state.data]
            const contactsAfter = contactsBefore.filter(contact => contact.id != action.dataDelete.id)
            return {
                ...state, data: contactsAfter
            }
        case DELETE_CONTACT_ERROR:
            return {
                ...state, error: action.error
            }
        default:
            return state
    }
}

export default ContactReducer