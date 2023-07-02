import { createContext, useEffect } from 'react'
import { db } from '../config/firebase'
import { collection, getDocs } from '@firebase/firestore'
import { ChildrenProps } from '../type'
interface DataContextType {
  data: string
}

export const DataContext = createContext<DataContextType | null>(null)

const DataProvider = ({ children }: ChildrenProps) => {
  async function getData(): Promise<void> {
    try {
      const userRef = collection(db, 'posts')
      const userSnap = await getDocs(userRef)
      userSnap.forEach((user) => {
        console.log(user.data())
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <DataContext.Provider value={{ data: 'vikas' }}>
        {children}
      </DataContext.Provider>
    </>
  )
}

export default DataProvider
