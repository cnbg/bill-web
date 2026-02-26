type FilterItem = {
  value: any
  matchMode: string
}

type Filters = Record<string, FilterItem>

export function convertFilters(filters: Filters): any[] {
  return Object.keys(filters)
    .reduce((acc, key) => {
      const v = filters[key]
      if (v && v.value && v.matchMode) {
        let operator = v.matchMode.toLowerCase()
        if(operator === 'equals') operator = '='
        else if (operator === 'notequals') operator = '<>'
        else if (operator === 'lt') operator = '<'
        else if (operator === 'lte') operator = '<='
        else if (operator === 'gt') operator = '>'
        else if (operator === 'gte') operator = '>='

        acc.push([key, operator, v.value])
      }
      return acc
    }, [] as any[])
    .flatMap((c, i) =>
      i === 0 ? [c] : ['and', c],
    )
}

export function toQueryString(params: Record<string, any>): string {
  const search = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    // arrays / objects must be JSON encoded
    if (typeof value === 'object') {
      search.append(key, JSON.stringify(value))
    } else {
      search.append(key, String(value))
    }
  })

  return search.toString()
}

type InputSort = {
  field: string
  order: number // 1 | -1
}

type OutputSort = {
  selector: string
  desc: boolean
}

export function convertSort(input: InputSort[]): OutputSort[] {
  return input.map(i => ({
    selector: i.field,
    desc: i.order === -1,
  }))
}
