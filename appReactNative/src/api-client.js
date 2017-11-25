const axios = require('axios');
const apiUrl = 'http://192.168.1.75:3000/api/';

var createUser = (data)=>{
    return axios.post(apiUrl + 'travelers/createFbTraveler', data);
}

var getExperienceProfile = (id)=>{
    return axios.get(apiUrl + 'travelers/'+ id+ '/experienceProfiles');
}

var getExperience = (id)=>{
    return axios.get(apiUrl + 'experiences/'+ id);
}

export { 
    createUser,
    getExperienceProfile,
    getExperience
}