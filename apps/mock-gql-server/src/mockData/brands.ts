export type MockedGqlBrand = {
  brand_id: string
  code: string
  is_active: boolean
}

export const brands: MockedGqlBrand[] = [
  {
    brand_id: 'brand_1',
    code: 'Opel',
    is_active: true,
  },
  {
    brand_id: 'brand_2',
    code: 'Kia',
    is_active: false,
  },
  {
    brand_id: 'brand_3',
    code: 'Nissan',
    is_active: true,
  },
]
