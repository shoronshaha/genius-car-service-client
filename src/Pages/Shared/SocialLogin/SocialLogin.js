import React from 'react';
import GoogleIcon from '../../../Images/icons8-google-48.png'
import GitHubIcon from '../../../Images/icons8-github-48.png'
import FacebookIcon from '../../../Images/icons8-facebook-48.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import useToken from '../../../Hooks/useToken';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const [token] = useToken(user || user1);
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    let errorElement;

    if (token) {
        navigate(from, { replace: true });
    }


    if (loading || loading1) {
        return <Loading></Loading>
    }


    if (error || error1) {

        errorElement = <div>
            <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
        </div>
    }


    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-primary w-50'></div>
            </div>
            {errorElement}
            <div onClick={() => signInWithGoogle()} className='btn btn-dark w-100 mb-2 p-2'>
                <img className='p-1' style={{ width: '30px' }} src={GoogleIcon} alt='' />  Google Sign In</div>
            <div onClick={() => signInWithGithub()} className='btn btn-success w-100 mb-2 p-2'>
                <img className='p-1' style={{ width: '30px' }} src={GitHubIcon} alt='' />  GitHub Sign In </div>
            <div className='btn btn-info w-100 mb-2 rounded p-2'>
                <img className='p-1' style={{ width: '30px' }} src={FacebookIcon} alt='' />Facebook Sign In  </div>
        </div>
    );
};

export default SocialLogin;