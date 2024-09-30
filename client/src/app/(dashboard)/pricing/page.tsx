'use client'

// Component Imports
import PricingWrapper from '@/views/front-pages/pricing'

// Data Imports
import { useLoginMutation } from '@/state/api'
import { useState, useEffect } from 'react'

const PricingPage = () => {
  const [login, { isLoading, error }] = useLoginMutation()
  const [email, setEmail] = useState('dasdas')
  const [password, setPassword] = useState('ddsadsa')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const result = await login({ email, password }).unwrap()
        //setResult(result);
        console.log('Login successful:', result)
      } catch (err) {
        console.error('Login failed:', err)
      }
    }

    handleLogin()
  }, [email, password, login])

  return (
    <div>
      <h1>Pricing ACB!</h1>
      {isLoading && <p>Loading...</p>}
      {/* {error && <p>Error: {error.message}</p>} */}
      {result && <p>Login successful: {JSON.stringify(result)}</p>}
    </div>
  )
}

export default PricingPage
