import React, { useState } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: {'Content-Type': 'application/json'}
    })

    if(response.status === 200){
      alert('Regsitration successful');
    }else{
      alert('Registration failed');
    }
  }
  return (
    <form onSubmit={register} className='register'>
        <h1>Register</h1>
        <input type="text" 
               placeholder='username'
               value={username}
               onChange={ev => setUsername(ev.target.value)}/>
        <input type='email' 
               placeholder='email'
               value={email}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" 
               placeholder='password'
               value={password}
               onChange={ev => setPassword(ev.target.value)}/>
        <button>Register</button>
    </form>
  )
}

export default RegisterPage