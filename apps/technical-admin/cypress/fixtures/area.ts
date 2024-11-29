import { QueryCountries } from '@/entities/country/api/types'

export const CREATE_LOCATION_OPERATION_DEFAULT_RESPONSE = {
  status: true,
}

export const GET_DMS_OPERATION_DEFAULT_RESPONSE = [
  {
    id: '1',
    name: 'AT Carlo',
  },
  {
    id: '2',
    name: 'DE Carlo',
  },
  {
    id: '3',
    name: 'PL Carlo',
  },
]

export const GET_CRM_OPERATION_DEFAULT_RESPONSE = [
  {
    id: '1',
    name: 'AT Catch',
  },
  {
    id: '2',
    name: 'DE Catch',
  },
  {
    id: '3',
    name: 'PL Catch',
  },
]

export const GET_AREAS_OPERATION_DEFAULT_RESPONSE = [
  {
    id: '94',
    code: '832',
    name: 'Konklux',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[0],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[1],
    address: {
      id: '38',
      city: 'Tarnawatka',
      address: '968 Kensington Terrace',
      postCode: '22-604',
      country: {
        id: '10',
        name: 'Poland',
      },
    },
    isActive: false,
  },
  {
    id: '07',
    code: '770',
    name: 'Hatity',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[1],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[0],
    address: {
      id: '40',
      city: 'Rogów',
      address: '27 Arkansas Circle',
      postCode: '95-063',
      country: {
        id: '11',
        name: 'Poland',
      },
    },
    isActive: false,
  },
  {
    id: '14',
    code: '111',
    name: 'Lotstring',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[2],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[1],
    address: {
      id: '78',
      city: 'Stanisław Dolny',
      address: '72810 Kings Street',
      postCode: '34-143',
      country: {
        id: '92',
        name: 'Poland',
      },
    },
    isActive: false,
  },
  {
    id: '33',
    code: '734',
    name: 'Solarbreeze',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[1],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[2],
    address: {
      id: '94',
      city: 'Kołaczyce',
      address: '629 Hayes Park',
      postCode: '38-213',
      country: {
        id: '39',
        name: 'Austria',
      },
    },
    isActive: false,
  },
  {
    id: '27',
    code: '370',
    name: 'Namfix',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[2],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[0],
    address: {
      id: '23',
      city: 'Wilczyce',
      address: '7228 East Road',
      postCode: '27-612',
      country: {
        id: '66',
        name: 'Germany',
      },
    },
    isActive: false,
  },
  {
    id: '64',
    code: '512',
    name: 'Lotlux',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[0],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[1],
    address: {
      id: '20',
      city: 'Ochota',
      address: '411 Pawling Alley',
      postCode: '05-090',
      country: {
        id: '70',
        name: 'Poland',
      },
    },
    isActive: false,
  },
  {
    id: '69',
    code: '246',
    name: 'Alpha',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[0],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[1],
    address: {
      id: '90',
      city: 'Łęczyce',
      address: '12430 Elmside Plaza',
      postCode: '84-218',
      country: {
        id: '05',
        name: 'Germany',
      },
    },
    isActive: true,
  },
  {
    id: '02',
    code: '752',
    name: 'Mat Lam Tam',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[2],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[2],
    address: {
      id: '78',
      city: 'Olsztyn',
      address: '550 Logan Court',
      postCode: '42-256',
      country: {
        id: '98',
        name: 'Austria',
      },
    },
    isActive: true,
  },
  {
    id: '33',
    code: '212',
    name: 'Trippledex',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[1],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[2],
    address: {
      id: '26',
      city: 'Lubichowo',
      address: '9 Springview Drive',
      postCode: '83-240',
      country: {
        id: '62',
        name: 'Poland',
      },
    },
    isActive: false,
  },
  {
    id: '80',
    code: '229',
    name: 'Stim',
    dms: GET_DMS_OPERATION_DEFAULT_RESPONSE[2],
    crm: GET_CRM_OPERATION_DEFAULT_RESPONSE[0],
    address: {
      id: '14',
      city: 'Reda',
      address: '03590 Delaware Drive',
      postCode: '84-240',
      country: {
        id: '06',
        name: 'Austria',
      },
    },
    isActive: true,
  },
]

export const GET_COUNTRIES_DEFAULT_RESPONSE: QueryCountries = [
  {
    id: '1',
    name: 'Germany',
  },
  {
    id: '2',
    name: 'Austria',
  },
]

export const CREATE_AREA_OPERATION_DEFAULT_RESPONSE = {
  id: 'mocked_area_1',
  code: 'Test Area',
}
