import React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
import { BiSearchAlt } from 'react-icons/bi';
import {RiHeart2Fill} from 'react-icons/ri'


const ServiceCard = ({ color,title,icon,subtitle }) => {
  return (
    <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}` }>
        {icon }
      </div>
      <div className='ml-5 flex flex-col flex-1'>
        <h3 className='mt-2 text-white text-lg'>{title}</h3>
        <p className='mt-2 text-white text-md md:w-9/12'>{subtitle}</p>
      </div>
    </div>
  )
}

const Services = () => {
  return (
    <div className='flex flex-col md:flex-row w-full justify-center gradient-bg-services'>
      <div className='flex md:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
        <div className='flex-1 flex flex-col justify-start items-start'>
          <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>Services that we 
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-start items-center'>
        <ServiceCard
          color='bg-[#2952e3]'
          title='Security Guaranteed'
          icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
          subtitle='security is Guaranteed. We always maintain the quality of our products'
        />
        <ServiceCard
          color='bg-[#8945F8]'
          title='Best exchange rate'
          icon={<BiSearchAlt fontSize={21} className='text-white' />}
          subtitle='Security is Guaranteed. We always maintain the quality of our products'
        />
        <ServiceCard
          color='bg-[#f84550]'
          title='Fastest Transaction'
          icon={<RiHeart2Fill fontSize={21} className='text-white'/>}
          subtitle='security is Guaranteed. We always maintain the quality of our products'
        />
      </div>
    </div>
  )
}

export default Services
