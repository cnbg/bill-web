export interface ListQuery {
  skip?: number
  take?: number
  search?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  requireTotalCount?: boolean
  requireGroupCount?: boolean
}
