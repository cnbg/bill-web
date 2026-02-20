export interface Payment {
  id: number
  org_id: string
  account: string
  amount: number
  source: string
  status: string
  year: number
  month: number
  note: string
}
