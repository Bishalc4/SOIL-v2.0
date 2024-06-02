import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Product ---------------------------------------------------------------------------------------
async function getUsers() {
    // Simply query with no parameters.
    const query = gql`
    {
        allUsers {
            username,
            password_hash,
            email,
            first_name,
            last_name,
            joinDate
        }
    }
    `;

  
    const data = await request(GRAPH_QL_URL, query);
  
    return data.allUsers;
}

async function addBlockedUser(username) {
    const query = gql`
        mutation AddBlockedUser($username: String!) {
            addBlockedUser(username: $username) {
                blocked_id,
                username
            }
        }
    `;

    const variables = {username};

    const data = await request (GRAPH_QL_URL, query, variables);

    return data.addBlockedUser;
}
  
export {
    getUsers, addBlockedUser
}