import { GraphQLClient } from "graphql-request";
const isCLient = typeof window != 'undefined'
export const graphQlClient = new GraphQLClient('http://localhost:8000/graphql', {
    headers: () => ({
        Authorization: isCLient ? `Bearer ${localStorage.getItem('twitter__user_token')}` : "",
    })
});