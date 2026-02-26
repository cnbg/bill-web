export interface ListQuery {
  skip?: number
  take?: number
  sort?: SortQuery[]
  filter?: [string, string, any][] // [field, operator, value]
  searchOperation?: string
  totalSummary?: SummaryQuery[]
  requireTotalCount?: boolean
  requireGroupCount?: boolean
}

interface SortQuery {
  selector: string
  desc: boolean
}

interface SummaryQuery {
  selector: string
  summaryType: string
}
