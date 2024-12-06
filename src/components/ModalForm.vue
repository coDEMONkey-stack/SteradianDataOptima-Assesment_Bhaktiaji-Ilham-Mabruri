<script lang="ts">
export default {
  name: 'ModalForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    context: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: true,
      localFormData: { ...this.formData },
      isEditing: !!this.formData.id,
    }
  },
  watch: {
    formData(newData) {
      this.localFormData = { ...newData }
      this.isEditing = !!newData.id
    },
  },
  methods: {
    closeModal() {
      this.open = false
      this.$emit('close')
    },
    confirmAction() {
      const eventType = this.isEditing ? 'update' : 'add'
      this.$emit(eventType, this.localFormData)
      this.closeModal()
    },
  },
}
</script>

<template>
  <div>
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 backdrop-blur-sm"
    >
      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <div class="px-6 py-4 text-left modal-content">
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              {{ title }}
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="closeModal">
              <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          <div class="space-y-4">
            <div v-if="context === 'cars'">
              <label for="name" class="block text-sm font-medium text-gray-700">Car Name</label>
              <input
                id="name"
                v-model="localFormData.name"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
              <label for="day_rate" class="block text-sm mt-4 font-medium text-gray-700">Day Rate</label>
              <input
                id="day_rate"
                v-model="localFormData.day_rate"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
              <label for="month_rate" class="block text-sm mt-4 font-medium text-gray-700">Month Rate</label>
              <input
                id="month_rate"
                v-model="localFormData.month_rate"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
              <label for="image" class="block text-sm mt-4 font-medium text-gray-700">Image</label>
              <input
                id="image"
                v-model="localFormData.image"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>
            <div v-else-if="context === 'orders'">
              <label for="car_id" class="block text-sm font-medium text-gray-700">Car ID</label>
              <input
                id="car_id"
                v-model="localFormData.car_id"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
              <label for="order_date" class="block text-sm font-medium text-gray-700">Order Date</label>
              <input
                id="order_date"
                v-model="localFormData.order_date"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >

              <label for="pickup_date" class="block text-sm font-medium text-gray-700">Pickup Date</label>
              <input
                id="pickup_date"
                v-model="localFormData.pickup_date"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >

              <label for="dropoff_date" class="block text-sm font-medium text-gray-700">Dropoff Date</label>
              <input
                id="dropoff_date"
                v-model="localFormData.dropoff_date"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >

              <label for="pickup_location" class="block text-sm font-medium text-gray-700">Pickup Location</label>
              <input
                id="pickup_location"
                v-model="localFormData.pickup_location"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >

              <label for="dropoff_location" class="block text-sm font-medium text-gray-700">Dropoff Location</label>
              <input
                id="dropoff_location"
                v-model="localFormData.dropoff_location"
                type="text"
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none" @click="closeModal">
              Cancel
            </button>
            <button class="p-3 px-6 py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:outline-none" @click="confirmAction">
              {{ isEditing ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
