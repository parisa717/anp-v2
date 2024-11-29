export type MockedGqlWorkshopWork = {
  id: string
  name: string
  isCapacityEditable: boolean
  isDescriptionEditable: boolean
  isActive: boolean
  qualificationId: string
  brandIds: string[]
}

export const workshopWorks: MockedGqlWorkshopWork[] = [
  {
    id: '1',
    name: 'Suspension and Steering Service',
    isCapacityEditable: true,
    isDescriptionEditable: false,
    isActive: true,
    qualificationId: '1',
    brandIds: ['brand_1', 'brand_2', 'brand_3'],
  },
  {
    id: '2',
    name: 'Battery Service',
    isCapacityEditable: true,
    isDescriptionEditable: false,
    isActive: true,
    qualificationId: '2',
    brandIds: ['brand_3'],
  },
  {
    id: '3',
    name: 'Check brake, replace if necessary',
    isCapacityEditable: true,
    isDescriptionEditable: false,
    isActive: true,
    qualificationId: '3',
    brandIds: ['brand_2', 'brand_3'],
  },
  {
    id: '4',
    name: 'Engine Diagnostics',
    isCapacityEditable: true,
    isDescriptionEditable: false,
    isActive: true,
    qualificationId: '3',
    brandIds: ['brand_1', 'brand_2', 'brand_3'],
  },
  {
    id: '5',
    name: 'Electrical System Service',
    isCapacityEditable: true,
    isDescriptionEditable: false,
    isActive: true,
    qualificationId: '3',
    brandIds: ['brand_1', 'brand_2'],
  },
]
