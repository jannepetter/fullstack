import axios from "axios"

const baseUrl ="http://localhost:3001/persons"

const getAll=()=>{
    return axios.get(baseUrl)
}

const create =(personObj)=>{
    return axios.post(baseUrl,personObj)
}

const deletePerson =(id)=>{
    return axios.delete(baseUrl+"/"+id)
}

const updatePerson =(personObj)=>{
    return axios.put(baseUrl+"/"+personObj.id,personObj)
}

export default{
    getAll,
    create,
    deletePerson,
    updatePerson
}