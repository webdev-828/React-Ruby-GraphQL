/**
 * use the Query component from react-apollo
 * which accepts the query string as a property,
 *  to fetch the data on mount
 */

import React from 'react';

// Apollo Client
import { Query } from 'react-apollo';

// GraphQL Tag + query
import { BlogQuery } from '../../utils/graphql/queries/blog';

/**
 * @prop {(loading|data)} passed through render props
 */

export default () => (
  <Query query={BlogQuery}>
    {({ data, loading }) => (
      <div id="component-blog-index">
        {loading
          ? 'loading ...'
          : data.posts.map(({ title, id, body, imageUrl, user }) => (
              <div key={id}>
                {/* INDIVIDUAL BLOG POST BODY */}
                <h4>{title}</h4>
                {user && <p> {`added by ${user.profile.fullName}`}</p>}
                <p>{body}</p>
              </div>
            ))}
      </div>
    )}
  </Query>
);
