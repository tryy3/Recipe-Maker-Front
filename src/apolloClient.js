import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from "@apollo/client/core";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getTokenSilently } from './auth/vue3_auth.js';

// const link = ApolloLink.from([
//     setContext(async (_, { headers }) => {
//         const authorization = await getAuth();
//         const authorizationHeader = authorization ? { authorization } : {};
//         return {
//             headers: {
//                 ...headers,
//                 ...authorizationHeader
//             }
//         };
//     }),

//     onError(({ graphQLErrors, networkError }) => {
//         if (graphQLErrors)
//             graphQLErrors.forEach(({ message, locations, path }) =>
//                 console.log(
//                     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//                 )
//             );
//         if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     createUploadLink({
//         //uri: "https://recipe-maker-backend.tryy3.us/query"
//         //uri: "http://localhost:8090/query"
//         uri: "https://recipe-maker-backend.herokuapp.com/v1/graphql"
//     })
// ]);

const link = from([
    new ApolloLink((operation, forward) => {
        operation.setContext(async ({headers}) => {
            const authorization = await getAuth();
            const authorizationHeader = authorization ? { authorization } : {};
            return {
                headers: {
                    ...headers,
                    ...authorizationHeader
                }
            };
        });

        return forward(operation);
    }),
    new HttpLink({
        //uri: "https://recipe-maker-backend.tryy3.us/query"
        //uri: "http://localhost:8090/query"
        uri: "https://recipe-maker-backend.herokuapp.com/v1/graphql"
    })
])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

const getAuth = async () => {
    const token = await getTokenSilently();
    return token ? `Bearer ${token}` : "";
};

export default client;
