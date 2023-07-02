import { createContext, useReducer } from 'react'
import { ChildrenProps, ActionType } from '../type'
import { auth, db } from '../config/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
export const UserContext = createContext<UserContextType | null>(null)
// TYPE
interface UserContextType {
  userHandler: any
  userTask: UserState
}
interface UserState {
  bookmarks: string[]
  follower: string[]
  following: string[]
}

// INIT STATE
const initialState = {
  bookmarks: [],
  follower: [],
  following: [],
}
// REDUCER FUNCTION
function reducer(state: UserState, action: ActionType): any {
  if (auth.currentUser) {
    const docRef = doc(db, 'users', `${auth.currentUser.uid}`)
    switch (action.type) {
      case 'SETBOOKMARK':
        return { ...state, bookmarks: action.payload }

      case 'ADD_BOOKMARK':
        updateDoc(docRef, {
          bookmark: arrayUnion(action.payload),
        })
        return { ...state, bookmarks: [...state.bookmarks, action.payload] }
      case 'REMOVE_BOOKMARK':
        updateDoc(docRef, {
          bookmark: arrayRemove(action.payload),
        })
        const newBookmarks = state.bookmarks.filter(
          (ele) => ele !== action.payload
        )
        return { ...state, bookmarks: newBookmarks }
      case 'SETFOLLOWER':
        return { ...state, follower: action.payload }
      case 'ADD_FOLLOWER':
        updateDoc(docRef, {
          follower: arrayUnion(action.payload),
        })
        return { ...state, follower: [...state.follower, action.payload] }
      case 'REMOVE_FOLLOWER':
        updateDoc(docRef, {
          follower: arrayRemove(action.payload),
        })
        const newFollower = state.follower.filter(
          (ele) => ele !== action.payload
        )
        return { ...state, follower: newFollower }
      case 'SETFOLLOWING':
        return { ...state, following: action.payload }
      case 'ADD_FOLLOWING':
        updateDoc(docRef, {
          following: arrayUnion(action.payload),
        })
        return { ...state, following: [...state.following, action.payload] }
      case 'REMOVE_FOLLOWING':
        updateDoc(docRef, {
          following: arrayRemove(action.payload),
        })
        const newFollowing = state.following.filter(
          (ele) => ele !== action.payload
        )
        return { ...state, following: newFollowing }

      default:
        return state
    }
  }
}
const UserProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ userHandler: dispatch, userTask: state }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
