import React from 'react'
import Image from "next/image"
import { AiOutlineHeart, AiOutlineUpload } from "react-icons/ai"
import { BiMessageRounded } from "react-icons/bi"
import { FaRetweet } from "react-icons/fa"
import { FiMoreHorizontal } from "react-icons/fi"
import { Tweet } from '@/gql/graphql'
import Link from 'next/link'
interface FeedCardProps {
    data: Tweet
}
const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props;

    return (
        <div className="px-1 sm:px-3 border-b border-[#272727] cursor-pointer hover:bg-[#272727] transition-all">
            <div className="grid grid-cols-12 py-3">
                <div className="col-span-1">
                    <div className="w-fit">

                        {data?.author?.imageUrl && data?.author?.firstname && <Image
                            src={data?.author?.imageUrl}
                            alt={data?.author?.firstname}
                            width={60}
                            height={60}
                            className='rounded-full '
                        />}

                    </div>
                </div>
                <div className="col-span-11 text-gray-200 pl-1 sm:pl-3">
                    <div className="flex items-center justify-between">

                        <Link href={`${data.author?.id}`} >{data?.author?.firstname}</Link>
                        <div className=" ">

                            <FiMoreHorizontal className="hover:bg-[#627887]  text-4xl p-2 rounded-full hover:text-[#1D9df0]" />
                        </div>
                    </div>
                    <div>

                        <p>{data.content}</p>
                    </div>
                    <div>
                        {data.imageUrl && <Image
                            src={data.imageUrl}
                            className="object-contain"
                            alt="my-image"
                            width={300}
                            height={300}
                        />}
                    </div>
                    <div className="my-3 flex items-center justify-between text-xl px-3">
                        <div >
                            <BiMessageRounded />
                        </div>
                        <div className="hover:text-red-400">
                            <AiOutlineHeart />
                        </div>
                        <div>
                            <FaRetweet />
                        </div>
                        <div>
                            <AiOutlineUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard
