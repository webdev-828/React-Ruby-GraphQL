import gql from 'graphql-tag';

export const BlogQuery = gql`
  {
    posts {
      id
      body
      imageUrl

      user {
        id
        email

        profile {
          id
          fullName
        }
      }
    }
  }
`;
