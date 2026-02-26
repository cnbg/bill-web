export interface User {
  id: string
  orgId: string
  org: {
    id: string
    name: string
  }
  firstName: string
  lastName: string
  email: string
  type: string
}
