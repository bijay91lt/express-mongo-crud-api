const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {type: String, require: true, unique: true}
    password: { type: String, require: true}
});

//Hash password before saving
userSchema.pre('save', async function (){
    if(!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10);
});

//Compare password
userSchema. methods.comparePassword = function(plainPassword){
    return bcrypt.compare(plainPassword, this.password);
};

mmodule.exports = mongoose.model('User', userSchema);
