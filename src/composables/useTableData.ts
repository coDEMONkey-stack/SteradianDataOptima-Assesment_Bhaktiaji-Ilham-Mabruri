import { ref } from 'vue'
import axios from 'axios'

export interface IOrderData {
  id: string
  car_id: string
  order_date: string
  pickup_date: string
  dropoff_date: string
  pickup_location: string
  dropoff_location: string
}

export interface ICarData {
  id: string
  day_rate: string
  month_rate: string
  image: string
  name: string
}

export function useTableData() {
  const orders = ref<IOrderData[]>([])
  const cars = ref<ICarData[]>([])

  const fetchOrders = async () => {
    try {
      const orderResponse = await axios.get('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders')
      orders.value = orderResponse.data
    }
    catch (error) {
      console.error('Failed to fetch orders:', error)
    }
  }

  const fetchCars = async () => {
    try {
      const carResponse = await axios.get('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars')
      cars.value = carResponse.data
    }
    catch (error) {
      console.error('Failed to fetch cars:', error)
    }
  }

  const getCarImageById = (carId: string): string => {
    const car = cars.value.find(car => car.id === carId)
    return car ? car.image : ''
  }

  const fetchData = async () => {
    await Promise.all([fetchOrders(), fetchCars()])
  }

  const createOrder = async (orderData: IOrderData) => {
    try {
      const response = await axios.post('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders', orderData)
      orders.value.push(response.data)
    }
    catch (error) {
      console.error('Failed to create order:', error)
    }
  }

  const updateOrder = async (orderId: string, updatedData: Partial<IOrderData>) => {
    try {
      const response = await axios.put(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${orderId}`, updatedData)
      const index = orders.value.findIndex(order => order.id === orderId)
      if (index !== -1)
        orders.value[index] = response.data
    }
    catch (error) {
      console.error('Failed to update order:', error)
    }
  }

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await axios.delete(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${orderId}`)
      if (response.status === 200)
        orders.value = orders.value.filter(order => order.id !== orderId)
    }
    catch (error) {
      console.error('Failed to delete order:', error)
    }
  }

  const createCar = async (carData: ICarData) => {
    try {
      const response = await axios.post('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars', carData)
      cars.value.push(response.data)
    }
    catch (error) {
      console.error('Failed to create car:', error)
    }
  }

  const updateCar = async (carId: string, updatedData: Partial<ICarData>) => {
    try {
      const response = await axios.put(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${carId}`, updatedData)
      const index = cars.value.findIndex(car => car.id === carId)
      if (index !== -1)
        cars.value[index] = response.data
    }
    catch (error) {
      console.error('Failed to update car:', error)
    }
  }

  const deleteCar = async (carId: string) => {
    try {
      await axios.delete(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${carId}`)
      cars.value = cars.value.filter(car => car.id !== carId)
    }
    catch (error) {
      console.error('Failed to delete car:', error)
    }
  }

  fetchData()

  return {
    orders,
    cars,
    getCarImageById,
    createOrder,
    updateOrder,
    deleteOrder,
    createCar,
    updateCar,
    deleteCar,
  }
}
