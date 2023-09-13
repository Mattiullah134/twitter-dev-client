/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n    mutation Mutation($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n        id  \n        content\n        imageUrl\n            author {\n                firstname\n                lastname\n                imageUrl\n            }\n        }\n    }\n": types.MutationDocument,
    "#graphql\n    mutation FollowUserMutation($to: ID!) {\n        followUser(to: $to)\n    }\n": types.FollowUserMutationDocument,
    "#graphql\n    mutation UnfollowUserMutation($to: ID!) {\n        unFollowUser(to: $to)\n    }   \n": types.UnfollowUserMutationDocument,
    "#graphql\n        query GetTweets {\n            getTweets {\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstname\n                lastname\n                imageUrl\n            }\n        }\n    }\n": types.GetTweetsDocument,
    "#graphql\n    query Query($imageName: String!, $imageType: String!) {\n        getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n    }\n\n": types.QueryDocument,
    "#graphql\n    query verifyGoogleToken($token: String!) {\n        verifyGoogleAuthToken(token: $token)\n    }\n": types.VerifyGoogleTokenDocument,
    "#graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            firstname\n            lastname\n            imageUrl\n            email\n            recommendedUsers {\n                email\n                id  \n                firstname\n                lastname\n                imageUrl\n            }\n            tweets {\n                id\n                content\n                imageUrl\n                author {\n                    id\n                    imageUrl\n                    firstname\n                    lastname\n                }\n            }\n            followers {\n                email\n                id\n                imageUrl\n                firstname\n                lastname\n            }\n            followings {\n                email\n                firstname\n                id\n                lastname\n                imageUrl\n            }\n        }\n    }\n": types.GetCurrentUserDocument,
    "#graphql\n        query GetUserById($id: ID!) {\n            getUserById(id: $id) {\n                id\n                email\n                firstname\n                imageUrl\n                lastname\n                tweets {\n                    id\n                    content\n                    imageUrl\n                    author {\n                        id\n                        firstname\n                        lastname\n                        imageUrl\n                        email\n                    }\n                }\n                followers {\n                    email\n                    id\n                    imageUrl\n                    firstname\n                    lastname\n                }\n                followings {\n                    email\n                    firstname\n                    id\n                    lastname\n                    imageUrl\n                }\n            }\n        }\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation Mutation($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n        id  \n        content\n        imageUrl\n            author {\n                firstname\n                lastname\n                imageUrl\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation Mutation($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n        id  \n        content\n        imageUrl\n            author {\n                firstname\n                lastname\n                imageUrl\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation FollowUserMutation($to: ID!) {\n        followUser(to: $to)\n    }\n"): (typeof documents)["#graphql\n    mutation FollowUserMutation($to: ID!) {\n        followUser(to: $to)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation UnfollowUserMutation($to: ID!) {\n        unFollowUser(to: $to)\n    }   \n"): (typeof documents)["#graphql\n    mutation UnfollowUserMutation($to: ID!) {\n        unFollowUser(to: $to)\n    }   \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n        query GetTweets {\n            getTweets {\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstname\n                lastname\n                imageUrl\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n        query GetTweets {\n            getTweets {\n            id\n            content\n            imageUrl\n            author {\n                id\n                firstname\n                lastname\n                imageUrl\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query Query($imageName: String!, $imageType: String!) {\n        getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n    }\n\n"): (typeof documents)["#graphql\n    query Query($imageName: String!, $imageType: String!) {\n        getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query verifyGoogleToken($token: String!) {\n        verifyGoogleAuthToken(token: $token)\n    }\n"): (typeof documents)["#graphql\n    query verifyGoogleToken($token: String!) {\n        verifyGoogleAuthToken(token: $token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            firstname\n            lastname\n            imageUrl\n            email\n            recommendedUsers {\n                email\n                id  \n                firstname\n                lastname\n                imageUrl\n            }\n            tweets {\n                id\n                content\n                imageUrl\n                author {\n                    id\n                    imageUrl\n                    firstname\n                    lastname\n                }\n            }\n            followers {\n                email\n                id\n                imageUrl\n                firstname\n                lastname\n            }\n            followings {\n                email\n                firstname\n                id\n                lastname\n                imageUrl\n            }\n        }\n    }\n"): (typeof documents)["#graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            firstname\n            lastname\n            imageUrl\n            email\n            recommendedUsers {\n                email\n                id  \n                firstname\n                lastname\n                imageUrl\n            }\n            tweets {\n                id\n                content\n                imageUrl\n                author {\n                    id\n                    imageUrl\n                    firstname\n                    lastname\n                }\n            }\n            followers {\n                email\n                id\n                imageUrl\n                firstname\n                lastname\n            }\n            followings {\n                email\n                firstname\n                id\n                lastname\n                imageUrl\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n        query GetUserById($id: ID!) {\n            getUserById(id: $id) {\n                id\n                email\n                firstname\n                imageUrl\n                lastname\n                tweets {\n                    id\n                    content\n                    imageUrl\n                    author {\n                        id\n                        firstname\n                        lastname\n                        imageUrl\n                        email\n                    }\n                }\n                followers {\n                    email\n                    id\n                    imageUrl\n                    firstname\n                    lastname\n                }\n                followings {\n                    email\n                    firstname\n                    id\n                    lastname\n                    imageUrl\n                }\n            }\n        }\n"): (typeof documents)["#graphql\n        query GetUserById($id: ID!) {\n            getUserById(id: $id) {\n                id\n                email\n                firstname\n                imageUrl\n                lastname\n                tweets {\n                    id\n                    content\n                    imageUrl\n                    author {\n                        id\n                        firstname\n                        lastname\n                        imageUrl\n                        email\n                    }\n                }\n                followers {\n                    email\n                    id\n                    imageUrl\n                    firstname\n                    lastname\n                }\n                followings {\n                    email\n                    firstname\n                    id\n                    lastname\n                    imageUrl\n                }\n            }\n        }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;