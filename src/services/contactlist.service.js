import Axios from 'axios'

async function getContacts() {
    try{
        const {data} = await Axios.get('https://simple-contact-crud.herokuapp.com/contact')
        return data
    }catch(error){
        throw error.response.data.message
    }
    // return Axios.get('https://simple-contact-crud.herokuapp.com/contact')
}

async function getContactDetail(id) {
    try{
        const {data} = await Axios.get('https://simple-contact-crud.herokuapp.com/contact/'+id)
        return data
    }catch(error){
        throw error.response.data.messager
    }
}

async function addContact(newcontact){
    try{
        const {data} = await Axios.post('https://simple-contact-crud.herokuapp.com/contact', newcontact)
        return data
    }catch(error){
        throw error.response.data.message
    }
}

const updateContact = async (id, newcontact) => {
    console.log("new contact posisi update services =======}",newcontact)
    try{
        const {data} = await Axios.put('https://simple-contact-crud.herokuapp.com/contact/'+id, newcontact)
        console.log("setelah axios", data)
        return data
    }catch(error){
        console.log("ini error service update", error.response.data)
        throw error.response.data.message
    }
}

const deleteContact = async (id) => {
    try{
        const {data} = await Axios.delete('https://simple-contact-crud.herokuapp.com/contact/'+id.data)
        return data
    }catch(error){
        throw error.response.data.message
    }
}

export { getContacts, addContact, updateContact, getContactDetail, deleteContact }