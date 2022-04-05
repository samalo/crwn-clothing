
import { getRedirectResult } from 'firebase/auth';
import { 
     auth,
     signInWithGooglePopup,
     createUserDocumentFromAuth,
     createUserWithEmailAndPassword
     } 
    from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SingIn = () => {
    
    const logGoogleUser = async () => {
     const  { user } = await signInWithGooglePopup();
     const userDocRef = await createUserDocumentFromAuth(user);
    }

   
    return(
        <div>
            <h1>Sign in Page</h1>
            <button onClick={ logGoogleUser }>Sign in with Google popup</button>
            <SignUpForm />
        </div>
    )
}

export default SingIn;

