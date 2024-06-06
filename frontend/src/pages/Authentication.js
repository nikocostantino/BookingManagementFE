import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';
  if(mode!=='login' && mode!=='signup')
    throw json({message: 'Unsupported mode'}, {status: 422});

  const data = await request.formData();
  const authData = {
    username : data.get('username'),
    password : data.get('password'),
  };

  const respose = await fetch('http://localhost:8081/'+mode, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(authData)
  });

  if(respose.status === 422 || respose.status === 401){
    return respose;
  }

  if(!respose.ok){
    throw json({message: 'Could not authenticate user.'}, {status:500});
  }

  const resData = await respose.json();
  const token = resData.token;
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours()+1);
  localStorage.setItem('expiration', expiration.toISOString());
  return redirect('/');

}