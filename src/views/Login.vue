<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="card w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Couple's Expense Tracker</h1>
        <p class="text-gray-600">Enter your username to continue</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter 'b' or 'm'"
            class="input-field"
            :class="{ 'border-red-500': error }"
            @input="clearError"
          />
          <p v-if="error" class="mt-2 text-sm text-red-600">
            {{ error }}
          </p>
        </div>
        
        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  const user = username.value.toLowerCase().trim()
  
  if (!user) {
    error.value = 'Please enter a username'
    return
  }
  
  if (user !== 'b' && user !== 'm') {
    error.value = 'Username must be either "b" or "m"'
    return
  }
  
  loading.value = true
  
  try {
    // Store user in localStorage
    localStorage.setItem('currentUser', user)
    
    // Redirect to dashboard
    await router.push('/dashboard')
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const clearError = () => {
  error.value = ''
}

// Check if user is already logged in
const currentUser = localStorage.getItem('currentUser')
if (currentUser === 'b' || currentUser === 'm') {
  router.push('/dashboard')
}
</script> 