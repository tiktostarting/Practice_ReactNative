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
    
    if(firstname.length < 3 && firstname.length > 0){
        return "first name less than 3"
    }else if(firstname.length > 30){
        return "first name more than 30"
    }

    if(lastname.length < 3 && lastname.length > 0){
        return "lastname name less than 3"
    }else if(lastname.length > 30 ){
        return "last name more than 30"
    }

    if(!firstname.match(/^[0-9a-zA-Z]+$/)){
        return "first name just accept alphanumeric"
    }

    if(!lastname.match(/^[0-9a-zA-Z]+$/)){
        return "last name just accept alphanumeric"
    }    

    if(age > 100){
        return "age must be under 100 years old"
    }
    
    if(!arr.length){
        return ''
    }else{
        return `${arr} can't be empty`
    }
}

export default contactValidation