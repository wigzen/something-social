import { createContext, useState, useEffect } from 'react'
import { ChildrenProps, Login, SignUp, User } from '../type'
import { auth, db } from '../config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

// TYPE DEFINATION
interface AuthContextType {
  islogedin: boolean
  userData: any
  loginDetails: Login
  signupDetails: SignUp
  handleSignup: () => Promise<void>
  handleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
}
/*************************************************/

export const AuthContext = createContext<AuthContextType | null>(null)
const AuthProvider = ({ children }: ChildrenProps) => {
  // STATE
  const [signupDetails, setsignupDetails] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
  })
  const [loginDetails, setloginDetails] = useState({ email: '', password: '' })

  const [islogedin, setIslogedIn] = useState(false)
  const [userData, setUserData] = useState({})

  // FUNCTIONS
  setTimeout(() => {
    setIslogedIn(true)
  }, 2000)
  // SIGNUP
  async function handleSignup(): Promise<void> {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signupDetails.email,
        signupDetails.password
      )
      await setDoc(doc(db, 'users', auth.currentUser!.uid), {
        firstName: signupDetails.firstName,
        lastName: signupDetails.lastName,
        email: signupDetails.email,
        userName: signupDetails.userName,
        bookmarks: [],
        follower: [],
        following: [],
        bio: 'Barg about yourself',
        portfolio_link: 'www.portfolio.com',
        profile_pic: '',
        profile_banner: '',
      })
      setIslogedIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  //LOGIN
  async function handleLogin(): Promise<void> {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      )
      setIslogedIn(true)
    } catch (err) {
      console.log(err)
    }
  }

  // LOGOUT
  async function handleLogout(): Promise<void> {
    try {
      await signOut(auth)
      setIslogedIn(false)
    } catch (err) {
      console.log(err)
    }
  }
  // GETDATA
  async function getData(): Promise<void> {
    try {
      const data = await getDoc(doc(db, 'users', `${auth.currentUser!.uid}`))
      setUserData(() => {
        return data.data()
      })
    } catch (err) {
      console.log(err)
    }
  }

  /*************************************************/

  /*************************************************/
  // LIFECYCLE
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        setIslogedIn(true)
        getData()

        // console.log({ uid, status: 'Logedin', userData })
      } else {
        setIslogedIn(false)
        // console.log({ status: 'LogedOut' })
      }
    })
  }, [islogedin])
  return (
    <AuthContext.Provider
      value={{
        islogedin,
        userData,
        signupDetails,
        loginDetails,
        handleSignup,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
