<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <!-- Total Expenses -->
    <div class="card">
      <div class="flex items-center">
        <div class="p-2 bg-blue-100 rounded-lg">
          💰
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Total Expenses</p>
          <p class="text-2xl font-bold text-gray-900">${{ totalExpenses.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- B's Total -->
    <div class="card">
      <div class="flex items-center">
        <div class="p-2 bg-green-100 rounded-lg">
          👤
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">B's Total Spent</p>
          <p class="text-2xl font-bold text-gray-900">${{ bTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- M's Total -->
    <div class="card">
      <div class="flex items-center">
        <div class="p-2 bg-purple-100 rounded-lg">
          👤
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">M's Total Spent</p>
          <p class="text-2xl font-bold text-gray-900">${{ mTotal.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- Balance -->
    <div class="card">
      <div class="flex items-center">
        <div class="p-2 bg-yellow-100 rounded-lg">
          ⚖️
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">Balance</p>
          <p class="text-2xl font-bold" :class="balanceClass">
            {{ balanceText }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Settlement Details -->
  <div v-if="expenses.length > 0" class="card mb-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Settlement Details</h3>
    <div class="p-4 bg-gray-50 rounded-lg">
      <p class="text-lg font-medium" :class="balanceClass">
        {{ settlementText }}
      </p>
    </div>
  </div>

  <!-- No Data State -->
  <div v-else class="card text-center py-8">
    <div class="text-gray-400 text-4xl mb-4">📊</div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
    <p class="text-gray-600">Start by adding your first expense above!</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  expenses: {
    type: Array,
    default: () => []
  }
})

const totalExpenses = computed(() => {
  return props.expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
})

const bTotal = computed(() => {
  return props.expenses
    .filter(expense => expense.user === 'b')
    .reduce((sum, expense) => sum + (expense.amount || 0), 0)
})

const mTotal = computed(() => {
  return props.expenses
    .filter(expense => expense.user === 'm')
    .reduce((sum, expense) => sum + (expense.amount || 0), 0)
})

const sharedExpenses = computed(() => {
  return props.expenses.filter(expense => expense.splitType === 'shared')
})

const bShouldPay = computed(() => {
  return sharedExpenses.value.reduce((sum, expense) => {
    if (expense.customOwedAmount !== null && expense.customOwedAmount !== undefined) {
      if (expense.user === 'b') {
        return sum + (expense.amount - expense.customOwedAmount)
      } else {
        return sum + expense.customOwedAmount
      }
    } else {
      return sum + (expense.amount / 2)
    }
  }, 0)
})

const mShouldPay = computed(() => {
  return sharedExpenses.value.reduce((sum, expense) => {
    if (expense.customOwedAmount !== null && expense.customOwedAmount !== undefined) {
      if (expense.user === 'm') {
        return sum + (expense.amount - expense.customOwedAmount)
      } else {
        return sum + expense.customOwedAmount
      }
    } else {
      return sum + (expense.amount / 2)
    }
  }, 0)
})

const bSharedPaid = computed(() => {
  return sharedExpenses.value
    .filter(expense => expense.user === 'b')
    .reduce((sum, expense) => sum + (expense.amount || 0), 0)
})

const mSharedPaid = computed(() => {
  return sharedExpenses.value
    .filter(expense => expense.user === 'm')
    .reduce((sum, expense) => sum + (expense.amount || 0), 0)
})

const sharedBalance = computed(() => {
  const bDifference = bSharedPaid.value - bShouldPay.value
  return bDifference
})

const balanceText = computed(() => {
  const balance = Math.abs(sharedBalance.value)
  if (balance < 0.01) {
    return 'Even'
  } else if (sharedBalance.value > 0) {
    return `M owes B $${balance.toFixed(2)}`
  } else {
    return `B owes M $${balance.toFixed(2)}`
  }
})

const settlementText = computed(() => {
  const balance = Math.abs(sharedBalance.value)
  if (balance < 0.01) {
    return 'You\'re all settled up! 🎉'
  } else if (sharedBalance.value > 0) {
    return `M should pay B $${balance.toFixed(2)}`
  } else {
    return `B should pay M $${balance.toFixed(2)}`
  }
})

const balanceClass = computed(() => {
  const balance = Math.abs(sharedBalance.value)
  if (balance < 0.01) {
    return 'text-green-600'
  } else {
    return 'text-orange-600'
  }
})
</script> 