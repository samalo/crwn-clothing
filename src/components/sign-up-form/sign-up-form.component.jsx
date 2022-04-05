import { useState } from 'react';
import { createAuthUserEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
}

const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword ){
            alert('Passwords do not match!');
            return;
        }

        try{
            const {user}= await createAuthUserEmailAndPassword(email, password);
           
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(err){
            if(err.code === 'auth/email-already-in-use'){
              alert('Cannot create a ne user, email already in use!');
            }else{
                console.log('User creation encountered an ', err);
            }
            
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

   return(
      <div>
          <h1>Sign Up with your email and password</h1> 

          <form onSubmit={handleSubmit}>
              <lable for="displayName">Diplay name</lable>
              <input 
              type="text" 
              id="displayName" 
              name="displayName" 
              plaleholder="Fullname" 
               required onChange={handleChange} value={displayName}/>

              <lable for="email">Email</lable>
              <input 
              type="email" 
              id="email" 
              name="email" 
              plaleholder="Email" 
              required onChange={handleChange} value={email}/>

              <lable for="password">Password</lable>
              <input 
               type="password" 
               id="password" 
               name="password" 
               plaleholder="Password" 
               required onChange={handleChange} value={password}/>

              <lable for="ConfirmPassword">Confirm Password</lable>
              <input 
               type="password"
               id="confirmPassword" 
               name="confirmPassword" 
               plaleholder="Confirm Password" 
               required onChange={handleChange} value={confirmPassword}/>
              <button type="submit">Sign Up</button>
          </form>   
      </div>
   );
}

export default SignUpForm;