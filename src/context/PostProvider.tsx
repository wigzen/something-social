import { createContext, useReducer, useEffect, useContext } from 'react'
import { ChildrenProps, PostType } from '../type'
import { auth, db } from '../config/firebase'
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
} from 'firebase/firestore'
import { AuthContext } from './AuthProvider'
// TYPE
interface PostContextType {
  post: PostType[]
  postHandler: any
}

// REDUCER FUNCTION

function reducer(state: Array<PostType>, action: any): any {
  if (auth.currentUser) {
    switch (action.type) {
      case 'SET_POST':
        console.log(action.payload, '<--- payload')
        return [...action.payload]
      case 'ADD_POST':
        const post = { ...action.payload, userID: auth.currentUser.uid }
        setDoc(doc(db, 'posts', Math.random().toString(35).slice(2)), post)
        return [...state, post]

      case 'REMOVE_POST':
        if (auth.currentUser.uid === action.payload.userID) {
          deleteDoc(doc(db, 'posts', action.payload))
          return state.filter((ele) => ele._id !== action.payload._id)
        } else {
          return state
        }

      case 'LIKE_POST':
        updateDoc(doc(db, 'posts', action.payload), {
          like: increment(1),
        })
        return state.map((ele) => {
          if (ele._id === action.payload) {
            return { ...ele, like: ele.like + 1 }
          } else {
            return ele
          }
        })

      case 'DISLIKE_POST':
        updateDoc(doc(db, 'posts', action.payload), {
          like: increment(-1),
        })
        return state.map((ele) => {
          if (ele._id === action.payload) {
            return { ...ele, like: ele.like - 1 }
          } else {
            return ele
          }
        })

      case 'UPDATE_POST':
        if (auth.currentUser.uid === action.payload.userID) {
          updateDoc(doc(db, 'posts', action.payload), action.payload)
          return state.map((ele) => {
            if (ele._id === action.payload) {
              return { ...action.payload }
            } else {
              return ele
            }
          })
        } else {
          return state
        }
      default:
        return state
    }
  } else {
    return state
  }
}
export const PostContext = createContext<PostContextType | null>(null)
const PostProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, [])
  const { islogedin }: any = useContext(AuthContext)
  async function getPost(): Promise<void> {
    try {
      const temp: any[] = []
      const userRef = collection(db, 'posts')
      const userSnap = await getDocs(userRef)
      userSnap.forEach((user) => {
        temp.push(user.data())
      })
      dispatch({ type: 'SET_POST', payload: temp })
      console.log('End')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPost()
  }, [islogedin])

  return (
    <PostContext.Provider
      value={{
        post: state,
        postHandler: dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider
