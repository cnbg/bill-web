export interface Rate {
  id: string
  name: string
  type: string
  price?: number
  note?: string
  startDate: string
  endDate: string
  isActive: boolean
}
