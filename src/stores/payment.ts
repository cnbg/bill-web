import { defineStore } from 'pinia'
import type { Payment } from '@/types'
import { PaymentService } from '@/services'
import type { DtItem } from '@/types'

interface PaymentState {
  items: DtItem<Payment>
  item: Payment
  loading: boolean
  creating: boolean
  updating: boolean
  deleting: boolean
  errors: string[]
}

const usePaymentStore = defineStore(`payment-store`, {
  state: (): PaymentState => ({
    items: {} as DtItem<Payment>,
    item: {} as Payment,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    errors: [],
  }),
  getters: {},
  actions: {
    async getItems() {
      this.loading = true
      this.errors = []

      try {
        this.items = await PaymentService.getItems()
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async getItem(id: string) {
      this.loading = true
      this.errors = []

      try {
        this.item = await PaymentService.getItem(id)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_fetching_data')
      }

      this.loading = false
    },
    async deleteItems(ids: string[]) {
      this.deleting = true
      this.errors = []

      try {
        await PaymentService.deleteItems(ids)
      } catch (error) {
        this.errors.push(error instanceof Error ? error.message : 'error_deleting_data')
      }

      this.deleting = false
    },
  },
})

export default usePaymentStore
