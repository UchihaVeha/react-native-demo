import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  Avatar,
  Button,
  Card,
  Caption,
  Paragraph,
  FAB
} from 'react-native-paper';
import useFetchEntities from '../Hooks/useFetchEntities';
import useDeleteEntity from '../Hooks/useDeleteEntity';

const DEFAULT_IMAGE =
  'https://image.shutterstock.com/image-illustration/male-default-avatar-profile-gray-260nw-582509287.jpg';

function CompanyListItem({
  item: { key, name, address, phone, isActive, image }
}) {
  const [isLoading, deleteEntity] = useDeleteEntity(`companies/${key}`);
  return (
    <View style={styles.listItem}>
      <Card elevation={8}>
        <Card.Title
          title={name}
          subtitle={isActive ? 'Active' : 'Offline'}
          subtitleStyle={{ color: isActive ? Colors.green500 : Colors.red500 }}
          left={props => (
            <Avatar.Image size={44} source={image || { uri: DEFAULT_IMAGE }} />
          )}
        />
        <Card.Content>
          <View style={styles.row}>
            <Caption>address: </Caption>
            <Paragraph>{address}</Paragraph>
          </View>
          <View style={styles.row}>
            <Caption>phone: </Caption>
            <Paragraph>{phone}</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            color={Colors.red500}
            loading={isLoading}
            onPress={deleteEntity}
          >
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { isLoading, entities } = useFetchEntities('companies');
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator animating />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={entities}
          renderItem={props => <CompanyListItem {...props} />}
        />
      )}
      <FAB
        style={styles.addCompany}
        icon="plus"
        onPress={() => navigation.navigate('AddCompany')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  list: {},
  listItem: {
    padding: 16
  },
  addCompany: {
    backgroundColor: Colors.blue500,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  row: {
    flexDirection: 'row'
  }
});
