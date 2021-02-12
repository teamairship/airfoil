import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './common/Text';
import View from './common/View';

interface Props {
  data: any;
}

const Launch: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View row>
        <Text bold style={styles.missionName}>
          {data.mission_name}
        </Text>
        <Text style={styles.date}>{data.launch_date_utc}</Text>
      </View>
      {!!data.rocket && (
        <View row style={styles.rocketRow}>
          <Text style={styles.rocketText}>{data.rocket.rocket_name}</Text>
          <Text style={styles.rocketText}>{data.rocket.rocket_type}</Text>
        </View>
      )}
      <View>
        <Text style={styles.descriptionText}>{data.details || 'No description'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    backgroundColor: '#f6f6f6',
  },
  missionName: {
    fontSize: 16,
    marginRight: 10,
  },
  date: {
    color: 'gray',
  },
  rocketRow: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f40',
  },
  rocketText: {
    color: 'white',
  },
  descriptionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '200',
  },
});

export default Launch;
