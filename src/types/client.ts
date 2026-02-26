export interface Client {
  id: string
  clientTypeId: string
  clientType: {
    id: string
    name: string
  }
  account: string
  houseNum: string
  apartNum: string
  entrance: number
  floor: number
  area: number
  membersCount: number
  notes: string
}
