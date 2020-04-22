import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { getInstance } from "./auth";

const client = new ApolloClient({
    link: ApolloLink.from([
        setContext(async (_, { headers }) => {
            const authorization = await getAuth();
            const authorizationHeader = authorization ? { authorization } : {};
            return {
                headers: {
                    ...headers,
                    ...authorizationHeader
                }
            };
        }),

        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        createUploadLink({
            //uri: "https://recipe-maker-backend.tryy3.us/query"
            //uri: "http://localhost:8090/query"
            uri: "https://recipe-maker-backend.herokuapp.com/v1/graphql"
        })
    ]),
    cache: new InMemoryCache()
});

const getAuth = async () => {
    const token = await getInstance().getTokenSilently();
    return token ? `Bearer ${token}` : "";
};

export default client;
