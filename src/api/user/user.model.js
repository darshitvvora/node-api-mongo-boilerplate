import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    name: String,
    info: String,
    active: Boolean
});

export default mongoose.model('Thing', UserSchema);