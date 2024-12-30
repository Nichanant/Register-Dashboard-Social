import React from 'react'
import { FaUsers, FaRegNewspaper } from 'react-icons/fa6'

function Content({ totalUsersData, totalPostsData }) {
  return (
    <div className='px-10 rounded-lg'>
      <div className='flex flex-col md:flex-row'>
        <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg broder-3 border-blue-500'>
          <h3 className='flex items-center'><FaUsers className='mr-2' />Total Users</h3>
          <p className='text-7xl text-blue-900 mt-10'>{totalUsersData?.length}</p>
        </div>
        <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
          <h3 className='flex items-center'><FaRegNewspaper className='mr-2' />Total Posts</h3>
          <p className='text-7xl text-blue-900 mt-10'>{totalPostsData?.length}</p>
        </div>
      </div>
      <p className='text-center'>Managed by Nichanant.</p>
    </div>
  )
}

export default Content