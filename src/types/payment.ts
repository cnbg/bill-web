export interface Payment {
  id: string
  orgId: string
  clientId: string
  account: string
  amount: number
  source: string
  status: string
  year: number
  month: number
  note: string
}
