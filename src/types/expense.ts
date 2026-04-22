export interface Expense {
  id: string
  orgId: string | null
  amount: number
  status: string
  year: number
  month: number
  note: string
}
