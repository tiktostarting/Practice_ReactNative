import Axios from 'axios'

const postContact = async ( contact ) => {
    try{
        const { data } = await Axios.post("https://simple-contact-crud.herokuapp.com/contact", contact)
        return data
    }catch(error){
        console.log(error.response.data.message)
        throw error.data
    }
}

export default postContact