import Axios from 'axios'

const deleteContact = async (id) => {
    try{
        const{data} = await Axios.delete(`https://simple-contact-crud.herokuapp.com/contact/${id}`)
        return data
    }catch(error){
        throw error
    }
}

export default deleteContact