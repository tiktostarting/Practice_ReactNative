import Axios from 'axios'

const postContact = async ( contact ) => {
    try{
        const { data } = await Axios.post("https://simple-contact-crud.herokuapp.com/contact", contact)
        return data
    }catch(error){
        throw error.data
    }
}

export default postContact