"use client"
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react'
import type { NextPage } from 'next'
import TwitterLayout from '@/components/layouts/TwitterLayout'
import { BsArrowLeftShort } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import FeedCard from '@/components/FeedCard/page'
import { Tweet, User } from '@/gql/graphql'
import { graphQlClient } from '@/client/api'
import { getUserByIdQuery } from '@/graphql/queries/user'
import { PageNotFoundError } from 'next/dist/shared/lib/utils'
import Loader from '@/components/Loader/page'
import { followUserMutation } from '../../graphql/mutation/user'
import { useCurrentUser } from '@/hooks/user'
import { unFollowUserMutation } from '../../graphql/mutation/user'
import { useQueryClient } from '@tanstack/react-query'

const UserProfile: NextPage = (props: any) => {
    const id = props.params?.id;
    const [userById, setUserById] = useState<User>();
    const { user: currentUser } = useCurrentUser();
    const queryClient = useQueryClient()
    let message: string | null;
    if (!id) { PageNotFoundError }
    useEffect(() => {
        const fetchUserByIdCurrUser = async () => {

            const data = await graphQlClient.request(getUserByIdQuery, {
                id: id
            })
            setUserById(data.getUserById as User)

        }
        fetchUserByIdCurrUser();
    }, [currentUser, queryClient])



    const handleUserFollow = async (id: string) => {
        if (id) {

            await graphQlClient.request(followUserMutation, { to: id })
            await queryClient.invalidateQueries(['current-user'])
        }
        console.log(id);

    }
    const handleUserUnFollow = async (id: string) => {
        if (id) {

            await graphQlClient.request(unFollowUserMutation, { to: id })
            await queryClient.invalidateQueries(['current-user'])
        }
        console.log(id);

    }
    const amIFollowing = useMemo(() => {
        if (!id) {
            return false;
        } else {
            return (currentUser?.followings?.findIndex(el => el?.id === userById?.id) ?? -1) >= 0
        }
    }, [currentUser?.id, userById?.id])
    return (
        <>
            {userById ? <TwitterLayout>
                {userById ? <div className=''>
                    {/* profile page navbar */}
                    <div className='flex p-2 gap-6 items-center border-b border-[#272727] transition-all text-gray-200'>
                        <Link href={'/'} className='hover:bg-[#272727] cursor-pointer rounded-full'>
                            <BsArrowLeftShort className="text-4xl " />
                        </Link>
                        <div >
                            <p className='font-bold'>{`${userById?.firstname}  ${userById?.lastname}`}</p>
                            <p className='font-extralight text-xs'>{userById?.tweets?.length} Tweets</p>
                        </div>
                    </div>
                    {/* hero section */}
                    <div className='flex justify-between items-center text-gray-200 p-3 border-b border-[#272727]'>
                        <div className='w-full'>

                            <div className="w-fit mb-5">

                                {userById && userById.imageUrl && <Image
                                    src={userById?.imageUrl}
                                    alt={userById?.firstname}
                                    width={100}
                                    height={100}
                                    className='rounded-full '
                                />}

                            </div>
                            <div className='w-full'>
                                <h1 className='font-bold text-2xl'>{`${userById.firstname} ${userById.lastname}`}</h1>
                                <div className='flex w-full mt-5 items-center justify-between gap-2 text-sm  text-gray-400'>

                                    <div className='flex items-center gap-4'>

                                        <span>{userById.followers?.length} Followers</span>
                                        <span>{userById.followings?.length} Following</span>
                                    </div>
                                    {userById?.id !== currentUser?.id ? <div className='flex items-center gap-2'>
                                        {
                                            amIFollowing ? <button className='border px-3 py-2 rounded-full transition-all  bg-white text-black font-bold border-[#272727]' onClick={() => handleUserUnFollow(id)}>UnFollow</button> : <button className='border px-3 py-2 rounded-full transition-all  bg-white text-black font-bold border-[#272727]' onClick={() => handleUserFollow(id)}>Follow</button>
                                        }

                                    </div> : <div></div>}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        {userById.tweets?.map(tweet => {
                            return <FeedCard key={tweet?.id} data={tweet as Tweet} />
                        })}
                    </div>
                </div> : <h1>Loading....</h1>}
            </TwitterLayout > : <div className='text-white w-full h-screen flex justify-center items-center'><Loader /></div>
            }
        </>
    )
}

export default UserProfile
