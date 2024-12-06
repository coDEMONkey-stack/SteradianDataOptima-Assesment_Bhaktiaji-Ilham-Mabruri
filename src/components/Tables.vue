<script>
import ModalDelete from './ModalDelete.vue'
import ModalForm from './ModalForm.vue'

export default {
  name: 'MainTable',
  components: {
    ModalDelete,
    ModalForm,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  emits: ['edit', 'delete', 'openPopup', 'openPopupAdd'],
  data() {
    return {
      showPopupAdd: false,
      showPopupDelete: false,
      rowToDelete: null,
    }
  },
  methods: {
    togglePopupAdd() {
      this.showPopupAdd = !this.showPopupAdd
      this.$emit('openPopupAdd', this.showPopupAdd)
    },
    togglePopupDelete(row = null) {
      this.showPopupDelete = !this.showPopupDelete
      this.rowToDelete = row
      this.$emit('openPopup', this.showPopupDelete)
    },
    deleteRow() {
      this.$emit('delete', this.rowToDelete.id)
      this.togglePopupDelete()
    },
  },

}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-3xl font-medium text-gray-700">
        {{ title }}
      </h3>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        @click="togglePopupAdd()"
      >
        Tambah Data
      </button>
    </div>

    <div class="mt-1">
      <h4 class="text-gray-600">
        {{ subtitle }}
      </h4>
      <div class="flex flex-col mt-6">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th v-for="(header, index) in headers" :key="index" class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    {{ header }}
                  </th>
                  <th class="px-6 py-3 gap-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                  <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                    <template v-if="column === 'car_id'">
                      <img :src="row.car_image" alt="Car Image" class="w-10 h-10 rounded-full">
                    </template>
                    <template v-else>
                      {{ row[column] || '-' }}
                    </template>
                  </td>
                  <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                    <div class="flex space-x-2">
                      <button class="text-blue-500 hover:text-blue-700" @click="$emit('edit', row)">
                        <font-awesome-icon :icon="['fas', 'pen']" />
                      </button>
                      <button class="text-red-500 hover:text-red-700" @click="togglePopupDelete(row)">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <ModalDelete
      v-if="showPopupDelete"
      title="Konfirmasi Hapus Data"
      subject="Anda yakin akan menghapus data ini?"
      @close="togglePopupDelete"
      @confirm="deleteRow"
    />

    <ModalForm
      v-if="showModal"
      @close="closePopup"
      @add="addCar"
      @update="updateCar"
    />
  </div>
</template>
