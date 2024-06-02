import { request, gql } from "graphql-request";

const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Users ---------------------------------------------------------------------------------------
async function getUsers() {
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

async function getBlockedUsers() {
    const query = gql`
    {
        allBlockedUsers {
            blocked_id,
            username
        }
    }
    `;

    const data = await request(GRAPH_QL_URL, query);
    console.log(data);
  
    return data.allBlockedUsers;
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

async function deleteBlockedUser(id) {
    const query = gql`
        mutation DeleteBlockedUser($blocked_id: Int!) {
            deleteBlockedUser(blocked_id: $blocked_id) {
                blocked_id,
                username
            }
        }
    `;

    const variables = {id};

    const data = await request (GRAPH_QL_URL, query, variables);

    return data.deleteBlockedUser;
}

// --- Products ---------------------------------------------------------------------------------------
async function getProducts() {
    // Simply query with no parameters.
    const query = gql`
    {
        allProducts {
            product_id,
            product_name,
            price,
            category,
            imageUrl
        }
    }
    `;

    const data = await request(GRAPH_QL_URL, query);

    console.log(data);
    
    return data.allProducts;
}


  
export {
    getUsers, addBlockedUser, getProducts,
    getBlockedUsers, deleteBlockedUser
}