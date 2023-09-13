import { graphQlClient } from "@/client/api"
import { CreateTweetData } from "@/gql/graphql"
import { addTweetMutation } from "@/graphql/mutation/tweet"
import { getTweets } from "@/graphql/queries/tweet"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphQlClient.request(addTweetMutation, {
            payload
        }),
        onSuccess: async (payload) => {
            await queryClient.invalidateQueries(["all-tweets"]);
            toast.success('Creating successfully', { id: "1" })
        },
        onError: () => toast.error('Please wait for 10 sec', { id: "1" }),
        onMutate: (payload) => toast.loading('Creating tweet', { id: "1" })
    })
    return mutation
}
export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: () => graphQlClient.request(getTweets)

    })

    return { ...query, tweets: query?.data?.getTweets }
}