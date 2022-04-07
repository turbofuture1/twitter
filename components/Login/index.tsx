import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Image from 'next/image'
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from '../../utils/firebase'


const Login = () => {
  
    const [user, loading, error] = useAuthState(auth)
      
    const provider = new GoogleAuthProvider()
    
    
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image
        src="https://rb.gy/ogau5a"
        width={150}
        height={150}
        objectFit="contain"
      />

      <div>
        {/* https://devdojo.com/tailwindcss/buttons#_ */}
        <button disabled={loading} className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white">
          <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-[#1d9bf0] transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white" onClick={() => signInWithPopup(auth, provider)}>
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  )
}

export default Login
