import Axios from 'axios'

const getContact = async () => {
    try{
        const { data } = await Axios.get("https://simple-contact-crud.herokuapp.com/contact")
        return data
    } catch (error) {
        throw new Error(error)
    }
}

const getContactId = async(id) => {
    try{
        const { data } = await Axios.get("https://simple-contact-crud.herokuapp.com/contact/"+id)
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export {getContact, getContactId}