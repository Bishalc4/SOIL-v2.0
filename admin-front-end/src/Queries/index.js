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

async function deleteBlockedUser(blocked_id) {
    try {
        const query = gql`
            mutation DeleteBlockedUser($blocked_id: Int!) {
                deleteBlockedUser(blocked_id: $blocked_id)
            }
        `;

        const variables = { blocked_id };

        const data = await request(GRAPH_QL_URL, query, variables);

        return data.deleteBlockedUser;
    } catch (error) {
        // Handle error
        console.error('Failed to delete blocked user:', error.message);
    }
}

// --- Reviews ---------------------------------------------------------------------------------------
async function getAllReviews() {
    const query = gql`
    {
        allReviews {
            review_id,
            text,
            rating,
            username,
            product_id,
        }
    }
    `;

    const data = await request(GRAPH_QL_URL, query);
  
    return data.allReviews;
}

async function addDeletedReview(review_id) {
    const query = gql`
        mutation AddDeletedReview($review_id: Int!) {
            addDeletedReview(review_id: $review_id) {
                deleted_id,
                review_id
            }
        }
`;

    const variables = {review_id};

    const data = await request (GRAPH_QL_URL, query, variables);

    return data.addDeletedReview;
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
    getBlockedUsers, deleteBlockedUser,
    getAllReviews, addDeletedReview
}