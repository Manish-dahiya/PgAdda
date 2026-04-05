import { faBiking, faShower, faSquare, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProperty } from '@/redux/propertySlice'  // adjust path
import { useRouter } from 'next/navigation'



function PropertyCard({ theme, item }) {
  let name= item?.propertyName 
  let price=item?.propertyRent 
  let id=item?._id
  let coverImg= item?.images[0].url
  let desc= item?.propertyDesc
  let type=item?.propertyType
  let bedrooms=item?.bedrooms
  let furnishedType=item?.furnishedType
  let bathrooms= item?.bathrooms
  let parking= item?.parking

  //-----------------------------------delete functionality
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userData.user.data)

  const pathname = usePathname()
  const isOwnerRoute = pathname?.startsWith('/owner')

   const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this property?')) return
    dispatch(deleteProperty({ propertyId: id, ownerId: userInfo._id }))
  }

  //-----------------------------------edit functionality for the owner
  const router = useRouter()

const handleEdit = () => {
    sessionStorage.setItem("editProperty", JSON.stringify(item))
    router.push(`/owner/edit-property/${id}`)
}


  return (
    <div className={`h-[400px] ${theme=="light" && "bg-[#cdbdeb]"}  w-auto md:mx-4  hover:scale-105 transition-transform border border-slate-500 rounded-lg px-3 pt-3 pb-4 flex flex-col`}>
   <div className="w-full flex justify-center items-center overflow-hidden rounded-lg">
  {coverImg && (
    <Image
      src={coverImg}
      alt="image"
      width={400}
      height={300}
      className="w-full h-auto max-h-[300px] object-cover rounded-lg object-center"
      priority
    />
  )}
</div>
      <h1 className='font-bold my-1'>{name}</h1>
      <p className=' mb-1'>    Enchanting three bedrooms, three bath home with spacious one
        bedroom, one bath...</p>
      {/* <p className='text-[#787a7e]'>propertyType: <span className='text-white'>{type}</span> </p>
        <p>furnishedType: {furnishedType}</p>
        <p>Bedrooms: {bedrooms}</p> */}
      <div className="advants grid grid-cols-3">
        <div>
          <span>Bedrooms</span>
          <div><i className="fas fa-th-large"></i><span> <FontAwesomeIcon icon={faSquare} />  {bedrooms}</span></div>
        </div>
        <div>
          <span>Bathrooms</span>
          <div><i className="fas fa-shower"></i><span> <FontAwesomeIcon icon={faShower} /> {bathrooms}</span></div>
        </div>
        <div>
          <span>Parking</span>
          <div>
            <i className="fas fa-vector-square"></i
            ><span>{parking ? <FontAwesomeIcon icon={faBiking} /> : <FontAwesomeIcon icon={faX} />}</span>
          </div>
        </div>
      </div>

      <div className="price flex justify-between items-center ">
        <div>
          <p>For Sale</p>
          <span className='text-2xl text-green-400'>&#8377; {`${price}/m`}</span>
        </div>
        <Link href={`/properties/${id}`} className='hover:text-blue-500 cursor-pointer' >View details</Link>
      </div>

      {/*should only appear when route is /owner  */}

        {isOwnerRoute && (
        <div className='flex justify-end gap-2 px-2'>
          <button className='bg-blue-600 rounded-md py-1 px-2 text-white hover:bg-blue-500' onClick={handleEdit}
>edit</button>
          <button className='bg-red-600 rounded-md p-1 text-white hover:bg-red-500'  onClick={handleDelete}>delete</button>
        </div>
      )}


    </div>
  )
}

export default PropertyCard
