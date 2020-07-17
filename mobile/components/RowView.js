import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class RowView extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'stretch',
    // justifyContent: 'center',
  },
});
