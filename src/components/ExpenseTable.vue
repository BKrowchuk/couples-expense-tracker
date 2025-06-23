<template>
  <div class="card">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h2 class="text-xl font-semibold text-gray-900">All Expenses</h2>
      
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search description or category..."
            class="input-field w-full sm:w-64 pl-8"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-400">🔍</span>
          </div>
        </div>
        
        <!-- Export Button -->
        <button
          @click="$emit('export-csv')"
          class="btn-secondary whitespace-nowrap"
          :disabled="filteredExpenses.length === 0"
        >
          📥 Export CSV
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading expenses...</p>
    </div>

    <!-- Desktop Table -->
    <div v-else-if="filteredExpenses.length > 0" class="hidden md:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="column.sortable && toggleSort(column.key)"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              :class="{ 'cursor-pointer hover:bg-gray-100': column.sortable }"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable && sortField === column.key" class="text-blue-600">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="expense in paginatedExpenses"
            :key="expense.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(expense.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="expense.user === 'b' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'"
              >
                {{ expense.user.toUpperCase() }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              ${{ expense.amount.toFixed(2) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ expense.description }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ expense.category || '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="expense.splitType === 'shared' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ expense.splitType === 'shared' ? 'Shared' : 'Individual' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ expense.customOwedAmount ? `$${expense.customOwedAmount.toFixed(2)}` : '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div v-else-if="filteredExpenses.length > 0" class="md:hidden space-y-4">
      <div
        v-for="expense in paginatedExpenses"
        :key="expense.id"
        class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="font-medium text-gray-900">{{ expense.description }}</p>
            <p class="text-sm text-gray-600">{{ formatDate(expense.date) }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-gray-900">${{ expense.amount.toFixed(2) }}</p>
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :class="expense.user === 'b' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'"
            >
              {{ expense.user.toUpperCase() }}
            </span>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 text-sm">
          <span v-if="expense.category" class="bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {{ expense.category }}
          </span>
          <span
            class="px-2 py-1 rounded"
            :class="expense.splitType === 'shared' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
          >
            {{ expense.splitType === 'shared' ? 'Shared' : 'Individual' }}
          </span>
          <span v-if="expense.customOwedAmount" class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            Owed: ${{ expense.customOwedAmount.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-400 text-4xl mb-4">📋</div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ searchQuery ? 'No matching expenses' : 'No expenses found' }}
      </h3>
      <p class="text-gray-600">
        {{ searchQuery ? 'Try adjusting your search terms' : 'Start by adding your first expense' }}
      </p>
    </div>

    <!-- Pagination -->
    <div v-if="filteredExpenses.length > itemsPerPage" class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to 
        {{ Math.min(currentPage * itemsPerPage, filteredExpenses.length) }} of 
        {{ filteredExpenses.length }} results
      </div>
      
      <div class="flex items-center space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn-secondary text-sm"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          Previous
        </button>
        
        <span class="text-sm text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn-secondary text-sm"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  expenses: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['export-csv'])

const searchQuery = ref('')
const sortField = ref('date')
const sortDirection = ref('desc')
const currentPage = ref(1)
const itemsPerPage = 10

const columns = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'user', label: 'User', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'splitType', label: 'Split Type', sortable: true },
  { key: 'customOwedAmount', label: 'Custom Owed', sortable: false }
]

const filteredExpenses = computed(() => {
  let result = [...props.expenses]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(expense =>
      expense.description.toLowerCase().includes(query) ||
      (expense.category && expense.category.toLowerCase().includes(query))
    )
  }

  // Apply sorting
  result.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]

    // Handle different data types
    if (sortField.value === 'date') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    } else if (sortField.value === 'amount') {
      aValue = Number(aValue)
      bValue = Number(bValue)
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (aValue < bValue) {
      return sortDirection.value === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortDirection.value === 'asc' ? 1 : -1
    }
    return 0
  })

  return result
})

const totalPages = computed(() => {
  return Math.ceil(filteredExpenses.value.length / itemsPerPage)
})

const paginatedExpenses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredExpenses.value.slice(start, end)
})

const toggleSort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Reset to first page when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})
</script> 