import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { LINKS_PER_PAGE } from '../constants';
import Link from './Link';





export const FEED_QUERY = gql`
  {
  links{
    id
    url
    description
    postedBy{
      id
      email
      username
    }
    votes{
      edges{
        node{
          id
          link{
            id
            url
            description
          }
        }
      }
    }
  }
}
`;




const LinkList = () => {
    const { data } = useQuery(FEED_QUERY);

    return (
    <div>
    {data && (
      <>
        {data.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </>
    )}
  </div>
    );
  };

export default LinkList;

