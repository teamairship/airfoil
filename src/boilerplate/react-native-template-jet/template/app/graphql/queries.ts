import { gql } from '@apollo/client';

export const GET_UPCOMING_LAUNCHES = gql`
  query GetUpcomingLaunches($limit: Int) {
    launchesUpcoming(limit: $limit) {
      details
      is_tentative
      launch_date_utc
      launch_site {
        site_name
      }
      mission_name
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;
