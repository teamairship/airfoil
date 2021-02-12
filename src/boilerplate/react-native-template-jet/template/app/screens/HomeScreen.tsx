import React from 'react';
import { useQuery } from '@apollo/client';
import { ScrollView } from 'react-native-gesture-handler';

import { GET_UPCOMING_LAUNCHES } from '@/graphql/queries';
import Loader from '@/components/common/Loader';
import View from '@/components/common/View';
import Text from '@/components/common/Text';
import Launch from '@/components/Launch';
import Screen from '@/components/common/Screen';

const HomeScreen = () => {
  const { loading, error, data } = useQuery(GET_UPCOMING_LAUNCHES);
  if (loading) return <Loader />;

  if (!data?.launchesUpcoming?.length)
    return (
      <Screen>
        <View>
          <Text>No upcoming launches at this time.</Text>
        </View>
      </Screen>
    );

  if (error) {
    console.error(error);
    return (
      <Screen>
        <View>
          <Text>Something went wrong.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView>
        {data.launchesUpcoming.map((launch: any, index: number) => (
          <Launch key={`${index}_${launch.id}`} data={launch} />
        ))}
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
