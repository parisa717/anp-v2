import { useTranslation } from 'react-i18next'

const AreaDetailCard = () => {
  const { t } = useTranslation()

  const translate = (key: string) => t(`pages.areas.areaDetail.${key}`)

  //const { id = '' } = useParams<{ id: string }>()

  //const { data: area, isLoading } = useGetAreaQuery({ id })

  const area = {
    id: '3',
    code: '003',
    name: 'AMZ Leipzig GmbH',
    isActive: true,
    address: {
      id: '2',
      country: {
        id: '1',
        name: 'Germany',
      },
      postCode: '00000',
      city: 'Leipzig',
      address: 'Example street 12',
    },
    dms: {
      id: '2',
      name: 'Carlo DE',
    },
    crm: {
      id: '2',
      name: 'CRM 2',
    },
  }

  // if (isLoading) return <h1>is Loading...</h1>
  return (
    <div className="p-[24px] flex justify-between items-center border-[0.5px] border-solid border-[#BCC3CD] rounded-[4px] mb-[37px]">
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.area')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.code}</p>
      </div>
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.name')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.name}</p>
      </div>
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.country')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.address.country.name}</p>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <p className="text-[#64748B] text-[14px] font-[400] my-0">{translate('details.dms')}</p>
          {/* <div className=" cursor-pointer mb-0"><img src={EditIcon} alt="edit" /> </div> */}
        </div>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.dms.name}</p>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <p className="text-[#64748B] text-[14px] font-[400] my-0">{translate('details.crm')}</p>
          {/* <div className=" cursor-pointer mb-0"><img src={EditIcon} alt="edit" /> </div> */}
        </div>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.crm.name}</p>
      </div>
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.postCode')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.address.postCode}</p>
      </div>
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.city')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.address.city}</p>
      </div>
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.address')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.address.address}</p>
      </div>
      <div>
        <p className="text-[#64748B] text-[14px] font-[400]">{translate('details.status')}</p>
        <p className="text-[#465161] text-[18px] font-[600]">{area?.isActive ? 'Active' : 'Inactive'}</p>
      </div>
    </div>
  )
}

export default AreaDetailCard
