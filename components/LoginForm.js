export default function LoginForm() {
  const loginUser = async event => {
    event.preventDefault()

    const res = await fetch('/api/users/login', {
      body: JSON.stringify({
        user: {
          username: event.target.username.value,
          password: event.target.password.value
        }
        
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json();
  }
  return (   
      <form >
        <label htmlFor="username">username</label>
        <input id="username" name="username" type="text" autoComplete="username" required />
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="text" autoComplete="name" required />
        <button type="submit">Log in</button>
    </form>    
  )
}