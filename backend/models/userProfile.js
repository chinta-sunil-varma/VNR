const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    year: {
        type: String,
        required: true,
    },
    section: { 
        type: String,
        required: true,
    },
    roll: {
       type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
},{timestamps:true})



const Profile = mongoose.model('PROFILE_PF', userProfile);
module.exports = Profile;