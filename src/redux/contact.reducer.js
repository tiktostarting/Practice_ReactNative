const ContactReducer = (state = [], action) => {
    switch(action.type){
        case 'INITIATE_CONTACTS' :
            if(action.data) return[...state, ...action.data]
        case 'ADD_CONTACTS' :
            return[...state, action.data]
        case 'UPDATE_CONTACTS' :
            const oldContacts = [...state]
            const newContacts = oldContacts.map ( contact => {
                if(contact.id === action.data.id){
                    contact.age = action.data.age
                    contact.firstName = action.data.firstName
                    contact.lastName = action.data.lastName
                    contact.photo = action.data.photo
                }
                return contact
            })
            return newContacts
        case 'DELETE_CONTACTS' :
            const contactsBefore = [...state]
            const contactsAfter = contactsBefore.filter( contact => contact.id != action.data.id)
            return contactsAfter
        default:
            return state
    }
}

export default ContactReducer