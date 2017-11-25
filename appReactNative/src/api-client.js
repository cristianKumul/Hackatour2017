const axios = require('axios');
const apiUrl = 'http://159.203.165.33:3000/api/';

var createUser = (data)=>{
    return axios.post(apiUrl + 'travelers/createFbTraveler', data);
}

var getExperienceProfile = (id)=>{
    return axios.get(apiUrl + 'travelers/'+ id+ '/experienceProfiles');
}

var getExperience = (id)=>{
    return axios.get(apiUrl + 'experiences/'+ id)
    .catch(function (error) {
        console.log(error + id);
    });
    
}

export { 
    createUser,
    getExperienceProfile,
    getExperience
}

