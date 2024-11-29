export type MockedGqlLocation = {
  id: string
  code: string
  name: string
  addressId: string
  areaId: string
  brandIds: string[]
  isActive: boolean
}

export const locations: MockedGqlLocation[] = [
  {
    id: '1',
    code: '001',
    name: 'AAC Albert Sigg GmbH',
    addressId: '1',
    areaId: '1',
    brandIds: ['brand_1', 'brand_2'],
    isActive: true,
  },
  {
    id: '3',
    code: '010',
    name: 'AMZ Leipzig GmbH',
    addressId: '2',
    areaId: '3',
    brandIds: ['brand_1'],
    isActive: true,
  },
  {
    id: '5',
    code: '011',
    name: 'AMZ Leipzig GmbH',
    addressId: '3',
    areaId: '3',
    brandIds: ['brand_1'],
    isActive: true,
  },
  {
    id: '7',
    code: '012',
    name: 'AMZ Leipzig GmbH',
    addressId: '4',
    areaId: '3',
    brandIds: ['brand_1'],
    isActive: true,
  },
]
