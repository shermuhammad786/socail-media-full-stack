import React from 'react'
import { usersDummyData } from './dummyPost/Dummy'

export default function ProfilePageRightBar() {
    return (
        <div>
            <h1 className='text-2xl'><b>User Informaiton</b></h1>
            <div className='mt-10'>
                <div className='flex gap-4'>
                    <p><b>City</b></p>
                    <p>Karachi</p>
                </div>
                <div className='flex gap-4'>
                    <p><b>From</b></p>
                    <p>Pakistan</p>
                </div>
                <div className='flex gap-4'>
                    <p><b>RelationShip</b></p>
                    <p>Single</p>
                </div>
            </div>
            <div className='mt-10'>
                <h1 className='text-2xl'><b>User Friends</b></h1>
                <div className='flex flex-wrap gap-5 justify-center'>
                    {usersDummyData?.map((singleUser, index) => (

                        <div key={index} className='flex flex-col items-center'>
                            <img className='h-24' width={"100px"} src={singleUser.profilePicture ? singleUser?.profilePicture : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAsAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADIQAAICAQEFBgUDBQEAAAAAAAABAgMEEQUSITFBBhMiUWFxMkJSgZGhwfAUIzNighX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZy52bTh179r4v4YrnIredtPIzG05blf0R/fzAnsna+Jjtxc3OS6QWpHW9obG2qaIpecpakIAJN7czXylXH/kR27mrm4P0cCMAE3V2hsT0uoi1/pLj+pI4u18TIairNyT+WfAqYAvi5AqGDtO/DaSbnV9En/NCy4ObTm171T4r4ovmgOoAAAAAAAAAAAAAOPaWdDCo33pKb+CPmzptnGquVlj0jFatlOzcqeZkO6fDXhFeSA15F1mRbK22W9KXU1gAAAAAH3AAAAbKL7MexW1S0lH9TWALhs3Ohm0by0VkeE4+TOwpeDlTw8iNsXwXCS80XGqyFtcZ1vWMlqmBmAAAAAAAAAAIPtHlbtcMaL4z8U+PToV87Nr3d9tC59IvdX2OMAAABL4Gx9+CsytUuagub9zRsbGV+S5zWsa1r9+hYgNVeNRV/jphH2ihZjUWJqdMJa+cUbQBCZ+yN2DsxdWutb5r2IkuPUr22sVUZKnHhCzjouj6gRwAAFh7N5W/XPGm+MPFHj06/z1K8dmyLu52hTLo5br+4FwAAAAAAAAPG9E2emM/gl7AUaTcpSk+rb/ACeBctGAAAAnuz6X9NY1zc+P4JQg9gXqNllEvm4x9ycfMAAABF9oEv6at9d/h+CUITtBepWVUx+Vbz+/ICIAAA9jJxkpLmmmjwAXtPVJ+Z6Yw+CPsZAAAAAAAAAUfIr7rJur+mbX6msk+0FHdZ7sS0jatfuuf7EYAAAGUJyrnGdct2UXqmWPB2hXlxSekLesW9E/YgMbGuyZaUQctHxeuiXuzunsS5V70bISs+nl+GBPAr2u1Mbhpfov9d4P/wBTI8Ol+j5+HdQEpn7RqxI6Ranb0iny9yuWTdk5Tk9W3q2ScNiXutudkIz6R5/lnBk412NNRug1ryfNP7gaQAANmNX3uRVWvmml+prJPs/R3udvtaqpa/fp+4FpAAAAAAAAAAEftnDeVhvc42V+KPr6FTL4Vnbmz+4teRUv7U34kvlYESd+zNnPLlv2axpXXrJ+hq2fiPLvUGmoLjOXkizwjGEFCKSilokgPK64VQUK4qMVySMgAAAAGNlcLYOFkVKL6MyAFc2ls+WLLfr1dL6/T6M4C4zjGcHGa1i1o0ysbQxJYeQ6+cHxg/NAcvQtmxsR4uIt5eOzxS9PJETsLZ7yLFkWx/tQfhX1MsqXDiB6AAAAAAAAAABjZCNkHCcVKLWjTMgBw4+BDDjNVatSlrx6ehsOo1yqT5cGBpBlKLjzRiAAAAA9jFt8EB4a8jBrzIwVuqUZa8Ob9DqjXpzeps5AY1wjXBQhFRilokuhkAAAAAAAAAAAAAAAAAAMXGL5oyAGHdx8h3cfIzAHijFckegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"} alt={singleUser.username} />
                            <h1 className='text-sm'>{singleUser?.username}</h1>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    )
}
