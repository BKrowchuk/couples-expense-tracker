import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './config'

const EXPENSES_COLLECTION = 'expenses'

// Add a new expense
export const addExpense = async (expenseData) => {
  try {
    const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), {
      ...expenseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding expense:', error)
    throw error
  }
}

// Get all expenses
export const getExpenses = async () => {
  try {
    const q = query(collection(db, EXPENSES_COLLECTION), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting expenses:', error)
    throw error
  }
}

// Listen to expense changes in real-time
export const listenToExpenses = (callback) => {
  const q = query(collection(db, EXPENSES_COLLECTION), orderBy('date', 'desc'))
  
  return onSnapshot(q, (querySnapshot) => {
    const expenses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(expenses)
  }, (error) => {
    console.error('Error listening to expenses:', error)
  })
} 