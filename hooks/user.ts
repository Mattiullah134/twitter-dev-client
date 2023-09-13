import { graphQlClient } from "@/client/api"
import { User } from "@/gql/graphql"
import { getCurrentUserQuery } from "@/graphql/queries/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: ['current-user'],
        queryFn: () => graphQlClient.request(getCurrentUserQuery)

    })

    return { ...query, user: query?.data?.getCurrentUser }
}

