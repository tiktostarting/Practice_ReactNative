function contactValidation(firstname, lastname, age, imageurl){
    if(!firstname.length){
        return("firstname can't be empty")
    }
    if(!lastname.length){
        return("lastName can't be empty")
    }
    if(!imageurl.length){
        return("must upload image !")
    }
    if(!age.length){
        return("age can't be empty")
    }else{
        return ''
    }
}

export default contactValidation