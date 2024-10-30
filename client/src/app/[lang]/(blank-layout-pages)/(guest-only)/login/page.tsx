// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  try {
    // log test
    console.log('LoginPage')

    // Vars
    const mode = getServerMode()

    console.log('getServerMode mode', mode)

    return <Login mode={mode} />
  } catch (catchError: any) {
    return { message: catchError.message, statusCode: 500 }
  }
}

export default LoginPage
