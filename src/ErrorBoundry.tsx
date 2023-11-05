import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.text}>Something went wrong!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: 'red' },
});
