import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from './Link';



const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($search: String) {
  links(search: $search){
      id
      url
        description
        postedBy {
          id
          username
        }
        votes {
          edges{
            node{
              id
               user {
                id
            }
            }
          }

        }
       # createdAt
  }
}
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    FEED_SEARCH_QUERY
  );

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { search: searchFilter }
            })
          }
        >
          OK
        </button>
      </div>
      {data &&
        data.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};
export default Search;
