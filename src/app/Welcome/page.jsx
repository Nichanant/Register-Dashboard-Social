"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'
import DeleteBtn from './DeleteBtn'

function WelcomePage() {

    const { data: session } = useSession(); // ใช้ Hooks useSession เข้ามาเก็บ ข้อมูลจาก storage session
    // console.log("ข้อมูล user ใน session", session);

    if (!session) redirect("/login"); // คือ เช็คว่า มีข้อมูลSession(ค่าที่เราlogin) เข้ามาไหม เม่ื่อ -ไม่มี- ให้ Redirect ไปที่หน้า login

    // if (session?.user?.role === "admin") redirect("/admin");
    const statusAdmin = (session?.user?.role === "admin")? "Admin" : "";

    const [postData, setPostData] = useState([]);
    const userEmail = session?.user?.email;
    console.log(postData);

    const getPost = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?.email=${userEmail}`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts.")
            }
            const data = await res.json();

            console.log(data);
            setPostData(data.posts);

        } catch (error) {
            console.log("Error loading post : ", error)
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    return (
        <div>
            <Container>
                <Navbar session={session} />
                <div className='flex-grow'>
                    <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl bg-gray-100 border border-2  border-blue-200'>
                        <div className='flex justify-between'>
                            <div>
                                <h3 className='text-xl'>Profile</h3>
                                <p className='text-3xl text-blue-900'>Welcome {statusAdmin}, {session?.user?.name}</p>
                                <p className='text-xl text-blue-900'>Email :  {session?.user?.email}</p>
                            </div>
                            <div>
                                <Link href="/create"
                                    className='bg-blue-600 text-white border px-2 py-3 rounded-md text-lg my-2'>Create Post</Link>
                            </div>
                        </div>

                        {postData && postData.length > 0 ? (
                            postData.map((val) => (
                                <div key={val._id}>
                                    <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl bg-white'>
                                        <h2 className='text-2xl text-blue-800 border-b-2 border-blue-500 pb-2 my-2'>Account : {val.userEmail.split("@")[0]}</h2>
                                        <h4 className='text-2xl'>{val.title}</h4>
                                        <Image className='my-3 shadow-md rounded-md mx-auto'
                                            width={300}
                                            height={0}
                                            src={val.img}
                                            alt={val.title} />
                                        <p className='text-center'>{val.content}</p>
                                        <p className='text-end text-blue-300'>Posted at :{val.createdAt.split("T")[0]}</p>
                                        <p className='text-end text-blue-300'>Time: {val.createdAt.slice(11, 19)} </p>
                                        <div className='mt-5 flex justify-end'>
                                            {(session?.user?.email) === (val.userEmail) &&
                                                <div><Link
                                                    className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2'
                                                    href={`/edit/${val._id}`}>
                                                    Edit</Link>
                                                    <DeleteBtn id={val._id} />
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <p>No Content Post</p>
                        )}

                    </div>
                </div>
                <Footer />
            </Container>
        </div>
    )
}

export default WelcomePage
