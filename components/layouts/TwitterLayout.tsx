"use client"
import { graphQlClient } from '@/client/api'
import { verifyGoogleAuthTokenQuery } from '@/graphql/queries/user'
import { useCurrentUser } from '@/hooks/user'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { QueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { CgMoreO } from 'react-icons/Cg'
import { HiHashtag } from 'react-icons/Hi'
import { IoMdNotifications } from 'react-icons/Io'
import { BiEnvelope, BiHomeCircle } from 'react-icons/bi'
import { BsBookmark, BsPerson, BsTwitter } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
const queryClient = new QueryClient()
interface TwitterSideBarButton {
    title: string,
    icon: React.ReactNode,
    link: string
}
interface TwitterLayoutProps {
    children: React.ReactNode
}
const TwitterLayout: React.FC<TwitterLayoutProps> = ({ children }) => {
    const { user } = useCurrentUser();
    const sideBarMesuItem: TwitterSideBarButton[] = useMemo(() => [
        {
            title: "Home",
            icon: <BiHomeCircle />,
            link: "/"

        },
        {
            title: "Explore",
            icon: <HiHashtag />,
            link: "/"
        },
        {
            title: "Notification",
            icon: <IoMdNotifications />,
            link: "/"
        },
        {
            title: "Messages",
            icon: <BiEnvelope />,
            link: "/"
        },
        {
            title: "Bookmarks",
            icon: <BsBookmark />,
            link: "/"
        },
        {
            title: "Profile",
            icon: <BsPerson />,
            link: user ? user?.id : ""
        },
        {
            title: "More",
            icon: <CgMoreO />,
            link: "/"
        }
    ], [user])
    const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
        const googleToken = cred.credential;
        if (googleToken) {
            try {

                const { verifyGoogleAuthToken } = await graphQlClient.request(verifyGoogleAuthTokenQuery, {
                    token: googleToken
                })
                toast.success("Token verify successfully")
                if (verifyGoogleAuthToken) localStorage.setItem("twitter__user_token", verifyGoogleAuthToken);
                await queryClient.invalidateQueries(['current-user'])
                console.log(verifyGoogleAuthToken);
            } catch (error) {
                toast.error("something went wrong")

            }

        } else {
            return toast.error('Google token not fond')
        }

    }, [queryClient]);
    return (
        <div className="grid text-white grid-cols-12 h-screen w-screen px-0 md:px-52" >
            <Toaster />
            <div className="col-span-1 overflow-hidden sm:col-span-3 sm:flex flex-col justify-between px-0 sm:px-2 ">
                {/* side bar */}
                <div>
                    <div className="text-xl sm:text-5xl cursor-pointer hover:bg-[#272727]  rounded-full w-fit h-fit pl-1 sm:p-2 text-gray-200 hover:text-white transition-all">

                        <BsTwitter />
                    </div>

                    <ul>
                        {sideBarMesuItem?.map(item => {
                            return <Link href={item.link} key={item.title} className="flex justify-start items-center my-5 hover:bg-[#272727]  w-fit py-2 pl-1 sm:px-3 rounded-full  cursor-pointer transition-all text-gray-200 hover:text-white gap-3">
                                <span className="text-xl sm:text-2xl">{item.icon}</span>
                                <span className="font-bold tracking-wide hidden sm:flex ">{item.title}</span>
                            </Link>
                        })}
                    </ul>
                    <div className="hidden sm:flex pr-5 ">

                        <button className="py-3 rounded-full bg-[#1D9df0] hover:bg-[#3dabf5] font-normal sm:font-bold w-full">Tweet</button>
                    </div>
                </div>
                {/* user badge for image name and email at sidebar */}
                {user && <div className="sm:flex  hover:bg-[#272727] transition-all items-center rounded-full p-2 cursor-pointer mb-3">
                    <div className="w-10">

                        {user && user.imageUrl && <Image
                            src={user?.imageUrl}
                            alt={user?.firstname}
                            width={60}
                            height={60}
                            className='rounded-full '
                        />}

                    </div>
                    <div className="max:sm:hidden  pl-2 text-md flex justify-between w-full">

                        <div>

                            <p className="text-white">{user?.firstname + user?.lastname}</p>
                            <p className="text-[#99a2aa]">{user?.email?.split("@")[0]}</p>
                        </div>
                        <div className=" ">

                            <FiMoreHorizontal className="hover:bg-[#627887]  text-4xl p-2 rounded-full hover:text-[#1D9df0]" />
                        </div>
                    </div>
                </div>}
            </div>
            {/* user feeds */}
            <div className="col-span-11 sm:col-span-6 border-r-[0.5px] border-l-[0.5px] overflow-y-scroll border-[#272727] ">
                {children}
            </div>
            {/* google login button */}
            <div className=" sm:col-span-3 px-2 ">
                {!user && <div className="border p-5 transition-all hover:bg-[#3c4145] rounded-md border-[#272727] cursor-pointer">
                    <h1 className="mb-2 text-gray-200">New to Twitter</h1>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            handleLoginWithGoogle(credentialResponse);
                        }}
                        onError={() => {
                            toast.error('Login Failed');
                        }}
                    />
                </div>}
                {user?.recommendedUsers && <div className="border p-1 transition-all  rounded-md border-[#272727] cursor-pointer mt-1">
                    <h1 className=' text-xl my-3'>
                        Users you may known
                    </h1>
                    {
                        user.recommendedUsers && user?.recommendedUsers.map(u => {
                            return <Link href={`${u?.id}`} key={u?.id} className='flex items-center gap-2  transition-all hover:bg-[#3c4145] px-1 py-1 rounded-lg'>
                                {u?.imageUrl && <div>
                                    <Image src={u?.imageUrl} alt={`maliha`} className='rounded-full' width={50} height={50} />
                                </div>}
                                <div className='hover:text-white'>
                                    <p className='text-gray-400 '>{u?.firstname} {u?.lastname}</p>
                                    {/* <p>{u?.email}</p> */}
                                </div>
                            </Link>
                        })
                    }
                </div>}
            </div>
        </div >
    )
}

export default TwitterLayout
