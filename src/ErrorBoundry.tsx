import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@Atoms';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return ErrorFallback();
    return this.props.children;
  }
}

function ErrorFallback() {
  return (
    <View style={styles.container}>
      <Text secondary>Something went wrong!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
