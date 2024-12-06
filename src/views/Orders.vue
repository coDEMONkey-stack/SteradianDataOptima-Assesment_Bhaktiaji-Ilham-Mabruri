<script>
import { useTableData } from '../composables/useTableData'
import MainTable from '../components/Tables.vue'

import ModalForm from '../components/ModalForm.vue'

export default {
  name: 'Orders',
  components: { MainTable, ModalForm },
  data() {
    return {
      title: 'Orders',
      subtitle: 'Lists Order',
      headers: ['ID', 'Car ID', 'Order Date', 'Pickup Date', 'DropOff Date', 'Pickup Location', 'Dropoff Location'],
      columns: ['id', 'car_id', 'order_date', 'pickup_date', 'dropoff_date', 'pickup_location', 'dropoff_location'],
      rows: [],
      showPopupAdd: false,
      editingOrder: null,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { orders } = useTableData()
      this.rows = orders
    },
    async deleteOrder(orderId) {
      const { deleteOrder } = useTableData()
      await deleteOrder(orderId).then(() => {
        this.loadData()
      })
    },
    togglePopupAdd() {
      this.showPopupAdd = !this.showPopupAdd
      this.editingOrder = null
    },
    editOrder(order) {
      this.editingOrder = order
      this.togglePopupAdd()
    },
    addNewOrder(orderData) {
      const { createOrder } = useTableData()
      createOrder(orderData).then(() => {
        this.loadData()
        this.togglePopupAdd()
      })
    },
    updateOrder(orderData) {
      const { updateOrder } = useTableData()
      updateOrder(orderData).then(() => {
        this.loadData()
        this.togglePopupAdd()
      })
    },
  },
}
</script>

<template>
  <div>
    <MainTable
      :title="title"
      :subtitle="subtitle"
      :headers="headers"
      :columns="columns"
      :rows="rows"
      @edit="editOrder"
      @delete="deleteOrder"
      @open-popup-add="togglePopupAdd"
    />
    <ModalForm
      v-if="showPopupAdd"
      :title="editingOrder ? 'Edit Order' : 'Add Order'"
      :form-data="editingOrder || {}"
      context="orders"
      @close="showPopupAdd = false"
      @add="addOrder"
      @update="updateOrder"
    />
  </div>
</template>
