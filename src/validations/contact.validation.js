function contactValidation(firstname, lastname, age, imageurl){
 
    let arr = []

    if(!firstname.length){
        arr.push('firstname')
    }
    if(!lastname.length){
        arr.push('lastname')
    }
    if(!imageurl.length){
        arr.push('image')
    }
    if(!age.length){
        arr.push('age')
    }
    if(!arr.length){
        return ''
    }else{
        return `${arr} can't be empty`
    }
}

export default contactValidation