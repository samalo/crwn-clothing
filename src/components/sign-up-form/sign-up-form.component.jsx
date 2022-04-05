import { useState } from 'react';
import FormInput from '../form-input/form-input.components';
import { createAuthUserEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

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
      <div className="sign-in-container">
          <h2>Don't have an account?</h2>
          <span>Sign Up with your email and password</span> 
          <form onSubmit={handleSubmit}>
              <FormInput 
              label="Diplay name"
              type="text" 
              id="displayName" 
              name="displayName" 
              plaleholder="Fullname" 
               required onChange={handleChange} value={displayName}/>

              <FormInput 
              label="Email"
              type="email" 
              id="email" 
              name="email" 
              plaleholder="Email" 
              required onChange={handleChange} value={email}/>

              <FormInput 
               label="Password"
               type="password" 
               id="password" 
               name="password" 
               plaleholder="Password" 
               required onChange={handleChange} value={password}/>

              <FormInput 
              label="Confirm Password"
               type="password"
               id="confirmPassword" 
               name="confirmPassword" 
               plaleholder="Confirm Password" 
               required onChange={handleChange} value={confirmPassword}/>
              <Button type="submit">Sign Up</Button>
          </form>   
      </div>
   );
}

export default SignUpForm;