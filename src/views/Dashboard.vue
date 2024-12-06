<script>
import { useTableData } from '../composables/useTableData'
import MainTable from '../components/Tables.vue'

import ModalForm from '../components/ModalForm.vue'

export default {
  name: 'Dashboard',
  components: { MainTable, ModalForm },
  data() {
    return {
      title: 'Cars',
      subtitle: 'Lists Car Inventory',
      headers: ['ID', 'Name', 'Day Rate', 'Month Rate', 'Image'],
      columns: ['id', 'name', 'day_rate', 'month_rate', 'image'],
      rows: [],
      showPopupAdd: false,
      editingCar: null,
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { cars } = useTableData()
      this.rows = cars
    },
    async deleteCar(carId) {
      const { deleteCar } = useTableData()
      await deleteCar(carId).then(() => {
        this.loadData()
      })
    },
    togglePopupAdd() {
      this.showPopupAdd = !this.showPopupAdd
      this.editingCar = null
    },
    editCar(car) {
      this.editingCar = car
      this.togglePopupAdd()
    },
    addNewCar(carData) {
      const { createCar } = useTableData()
      createCar(carData).then(() => {
        this.loadData()
        this.togglePopupAdd()
      })
    },
    updateCar(carData) {
      const { updateCar } = useTableData()
      updateCar(carData).then(() => {
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
      @edit="editCar"
      @delete="deleteCar"
      @open-popup-add="togglePopupAdd"
    />
    <ModalForm
      v-if="showPopupAdd"
      :title="editingCar ? 'Edit Car' : 'Add New Car'"
      :form-data="editingCar || {}"
      context="cars"
      @close="togglePopupAdd"
      @add="addNewCar"
      @update="updateCar"
    />
  </div>
</template>
