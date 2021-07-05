import Axios from 'axios'

const putContact = async (contact, id) => {
    try{
        const { data } = await Axios.put(`https://simple-contact-crud.herokuapp.com/contact/${id}`,contact)
        return data
    }catch(error){
        throw error.data
    }
}

export default putContact