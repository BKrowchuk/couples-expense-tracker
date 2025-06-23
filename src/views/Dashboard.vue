<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <h1 class="text-2xl font-bold text-gray-900">
            Couple's Expense Tracker
          </h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              Logged in as: <strong class="text-gray-900">{{ currentUser.toUpperCase() }}</strong>
            </span>
            <button
              @click="logout"
              class="btn-secondary text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Summary Cards -->
      <ExpenseSummary :expenses="expenses" />

      <!-- Expense Form -->
      <div class="mb-8">
        <ExpenseForm @expense-added="handleExpenseAdded" />
      </div>

      <!-- Expense Table -->
      <ExpenseTable 
        :expenses="expenses" 
        :loading="loading"
        @export-csv="exportToCSV"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { listenToExpenses } from '../firebase/expenses'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseSummary from '../components/ExpenseSummary.vue'
import ExpenseTable from '../components/ExpenseTable.vue'

const router = useRouter()
const expenses = ref([])
const loading = ref(true)
const currentUser = ref(localStorage.getItem('currentUser') || '')

let unsubscribe = null

const logout = () => {
  localStorage.removeItem('currentUser')
  router.push('/login')
}

const handleExpenseAdded = () => {
  // Expense is automatically updated via real-time listener
  console.log('Expense added successfully')
}

const exportToCSV = () => {
  if (expenses.value.length === 0) {
    alert('No expenses to export')
    return
  }

  const headers = ['Date', 'User', 'Amount', 'Description', 'Category', 'Split Type', 'Custom Owed Amount']
  const csvContent = [
    headers.join(','),
    ...expenses.value.map(expense => [
      expense.date,
      expense.user,
      expense.amount,
      `"${expense.description}"`,
      expense.category || '',
      expense.splitType,
      expense.customOwedAmount || ''
    ].join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  // Set up real-time listener for expenses
  unsubscribe = listenToExpenses((expenseData) => {
    expenses.value = expenseData
    loading.value = false
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script> 