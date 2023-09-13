"use client"
import React, { useCallback, useState } from "react";
import { BsTwitter, BsBookmark, BsPerson, BsImageFill } from "react-icons/bs";
import { BiHomeCircle, BiEnvelope } from "react-icons/bi";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { HiHashtag } from "react-icons/Hi";
import { IoMdNotifications, IoMdPulse } from "react-icons/Io";
import { CgMoreO } from "react-icons/Cg";
import FeedCard from "@/components/FeedCard/page";
import Image from "next/image";
import toast from 'react-hot-toast';
import { useCurrentUser } from "@/hooks/user";

import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/layouts/TwitterLayout";
import { graphQlClient } from "@/client/api";
import { getSignedUrlQuery } from "@/graphql/queries/tweet";
import axios from "axios";
import { getCurrentUserQuery } from "@/graphql/queries/user";



export default function Home() {
  const { user } = useCurrentUser();

  console.log(user);
  if (user?.id) {
    localStorage.setItem("current-user-id", user?.id)
  }
  const { tweets } = useGetAllTweets();
  const [tweetContent, setTweetContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { mutate } = useCreateTweet();
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (e: Event) => {
      e.preventDefault();
      console.log(input.files);
      const file: File | null | undefined = input.files?.item(0);
      if (!file) {
        return;
      }
      else {
        try {

          console.log(file);

          const { getSignedUrlForTweet } = await graphQlClient.request(getSignedUrlQuery, {
            imageName: file.name,
            imageType: file.type
          });
          console.log(file.name.split(".")[0], file.type);

          if (getSignedUrlForTweet) {
            console.log(getSignedUrlForTweet);
            toast.loading("Uploading image", { id: '2' });
            await axios.put(getSignedUrlForTweet, file, {
              headers: {
                'Content-Type': file.type
              }
            });
            toast.success("Upload image successfully", { id: '2' });
            const url = new URL(getSignedUrlForTweet);
            const myFilePath = `${url.origin}${url.pathname}`;
            setImageUrl(myFilePath);
            console.log('myFilePath', myFilePath);

          } else {
            toast.error("You are not authenticated")
          }
        } catch (error) {
          toast.error("Something went wrong while uploading image")
        }
      }
    }
  }, [imageUrl])
  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    const handlerFunc = handleInputChangeFile(input)
    input.addEventListener('change', handlerFunc)
    input.click();

  }, [handleInputChangeFile])
  const handleAddTweet = useCallback(async () => {


    try {
      if (tweetContent) {
        mutate({
          content: tweetContent,
          imageUrl: imageUrl
        })
        setTweetContent("")
        setImageUrl("")
      } else {
        toast.error("Fill the tweet input or login")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }

  }, [tweetContent])
  return (
    <>
      <TwitterLayout>
        <div className="grid grid-cols-12  sm:p-2 border-b border-[#272727]">
          <div className="col-span-1">
            <div className="w-10">

              {user && user.imageUrl && <Image
                src={user?.imageUrl}
                alt={user?.firstname}
                width={60}
                height={60}
                className='rounded-full '
              />}

            </div>
          </div>
          <div className="col-span-11  ">
            <div className="w-full mt-2 mb-2 ml-1 pb-3 border-b border-[#272727]">

              <textarea onChange={(e) => setTweetContent(e.target.value)} value={tweetContent} placeholder="What's Happening?" className="bg-transparent text-xl outline-none w-full" />

            </div>
            <div>
              {imageUrl && <Image
                src={imageUrl}
                className="object-contain"
                alt="my-image"
                width={300}
                height={300}
              />}
            </div>
            <div className="flex items-center justify-between">
              <div className="pl-3">
                <div className="cursor-pointer hover:bg-[#3c4145] p-2 rounded-full">
                  <BsImageFill onClick={handleSelectImage} />
                </div>
              </div>
              <div className="w-24">

                <button onClick={handleAddTweet} className="py-2 w-full rounded-full bg-[#1D9df0] hover:bg-[#3dabf5] font-bold ">Tweet</button>
              </div>
            </div>
          </div>
        </div>

        <div>

          {
            tweets?.map(tweet => {
              return <FeedCard key={tweet?.id} data={tweet as Tweet} />
            })
          }
        </div>
      </TwitterLayout >
    </>


  )
}

