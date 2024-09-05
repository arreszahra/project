import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

 

const userSchema= new Schema ({
    name: {type: String, required: true},
    title: {type: String},
    role : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password :{type: String, required: true},
    isAdmin: {type: Boolean, required: true, default:false},
    tasks :[{type: Schema.Types.ObjectId,  ref:"Task"}],
    isActive: {type: Boolean,  default:true},
},
{timestamps : true} // we don't need to add and update => will be automatically
);
userSchema.pre("save", async function (next){
    //this meaning the user we want to create
    if (!this.isModified("password")){
        //if modified we go to the next action
        next();
    }
    const salt =  await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}
userSchema.statics.login = async function(email, password) {

   /*  if (!email || !password) {
      throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Invalid email or password...')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Invalid email or password...')
    }

    return user */
  }
const User = mongoose.model("User",userSchema);
export default User;
