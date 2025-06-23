<template>
  <div class="card">
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Expense</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Amount -->
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
            Amount *
          </label>
          <input
            id="amount"
            v-model.number="form.amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            class="input-field"
            required
          />
        </div>

        <!-- Date -->
        <div>
          <label for="date" class="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            id="date"
            v-model="form.date"
            type="date"
            class="input-field"
            required
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <input
          id="description"
          v-model="form.description"
          type="text"
          placeholder="What was this expense for?"
          class="input-field"
          required
        />
      </div>

      <!-- Category -->
      <div>
        <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <input
          id="category"
          v-model="form.category"
          type="text"
          placeholder="e.g., Food, Transport, Entertainment"
          class="input-field"
        />
      </div>

      <!-- Split Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Split Type *
        </label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              v-model="form.splitType"
              type="radio"
              value="shared"
              class="mr-2"
            />
            <span>Shared (split between both)</span>
          </label>
          <label class="flex items-center">
            <input
              v-model="form.splitType"
              type="radio"
              value="individual"
              class="mr-2"
            />
            <span>Individual (only me)</span>
          </label>
        </div>
      </div>

      <!-- Custom Owed Amount (only for shared expenses) -->
      <div v-if="form.splitType === 'shared'" class="transition-all duration-200">
        <label for="customOwedAmount" class="block text-sm font-medium text-gray-700 mb-2">
          Custom amount the other person owes (optional)
        </label>
        <input
          id="customOwedAmount"
          v-model.number="form.customOwedAmount"
          type="number"
          step="0.01"
          min="0"
          :max="form.amount"
          placeholder="Leave empty for 50/50 split"
          class="input-field"
        />
        <p class="text-sm text-gray-500 mt-1">
          If left empty, the expense will be split 50/50. 
          You'll pay {{ form.amount ? (form.amount / 2).toFixed(2) : '0.00' }}, 
          they'll owe {{ form.amount ? (form.amount / 2).toFixed(2) : '0.00' }}.
        </p>
      </div>

      <!-- Submit Button -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          class="btn-primary flex-1"
          :disabled="loading || !isFormValid"
        >
          {{ loading ? 'Adding...' : 'Add Expense' }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="btn-secondary flex-1"
        >
          Reset
        </button>
      </div>
    </form>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>

    <!-- Success Message -->
    <div v-if="success" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <p class="text-green-700 text-sm">Expense added successfully!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { addExpense } from '../firebase/expenses'

const emit = defineEmits(['expense-added'])

const form = ref({
  amount: null,
  description: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  splitType: 'shared',
  customOwedAmount: null
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const currentUser = localStorage.getItem('currentUser')

const isFormValid = computed(() => {
  return form.value.amount && 
         form.value.amount > 0 && 
         form.value.description.trim() && 
         form.value.date
})

// Clear custom owed amount when switching to individual
watch(() => form.value.splitType, (newType) => {
  if (newType === 'individual') {
    form.value.customOwedAmount = null
  }
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  loading.value = true
  error.value = ''
  success.value = false

  try {
    const expenseData = {
      amount: form.value.amount,
      description: form.value.description.trim(),
      category: form.value.category.trim(),
      date: form.value.date,
      splitType: form.value.splitType,
      user: currentUser,
      customOwedAmount: form.value.splitType === 'shared' ? form.value.customOwedAmount : null
    }

    await addExpense(expenseData)
    
    success.value = true
    emit('expense-added')
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
      success.value = false
    }, 2000)

  } catch (err) {
    console.error('Error adding expense:', err)
    error.value = 'Failed to add expense. Please try again.'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    amount: null,
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    splitType: 'shared',
    customOwedAmount: null
  }
  error.value = ''
  success.value = false
}
</script> 