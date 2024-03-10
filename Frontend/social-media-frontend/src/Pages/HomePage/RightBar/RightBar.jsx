import React from 'react'
import BirthDay from '../../../Components/BirthDay';
import OnlineFriends from '../../../Components/OnlineFriends';
import { usersDummyData } from '../../../Components/dummyPost/Dummy';


export default function RightBar() {
  return (
    <div className='w-96'>
      {/* friends BirthDay */}
      <BirthDay />

      {/* image for post */}
      <div className='rounded' style={{ backgroundImage: `url("assests/friendparty.jpeg")`, width: "95%", height: "250px", backgroundRepeat: "no-repeat", backgroundSize: "cover", position: "relative", margin: "10px", }}>
        <h1 className='text-5xl font-bold h-40 w-48 relative top-10'>cold, smooth & testy</h1>
        <p className='absolute bottom-5 right-10 font-bold'>explore lama dev</p>
      </div>

      {/* online  Friends */}
      <div className='flex flex-col gap-7 mt-10'>
        <h1><b>Online Friends</b></h1>

        {usersDummyData.map((singleUser ,index) => <OnlineFriends key={index} singleUser={singleUser} />)}
        {/* <OnlineFriends />
        <OnlineFriends />
        <OnlineFriends />
        <OnlineFriends />
        <OnlineFriends /> */}
      </div>

    </div>
  )
}
