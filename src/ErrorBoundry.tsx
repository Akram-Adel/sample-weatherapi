import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@Atoms';

export const ErrorBoundaryContext = React.createContext<{
  error: any;
  handleError(error: any): void;
} | null>(null);

type ErrorBoundaryProps = { children: React.ReactNode };
type ErrorBoundaryState = { error: any };

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  handleError(error: any) {
    this.setState({ error });
  }

  /**
   * A more advanced solution is to not block the user with this error
   * message and allow him to still navigate the app.
   *
   * Also we can report the error to a provider like "Sentry" or our own
   * service
   */
  static renderFallback() {
    return (
      <View style={styles.container}>
        <Text secondary>Something went wrong!</Text>
      </View>
    );
  }

  render() {
    if (this.state.error) return ErrorBoundary.renderFallback();

    return React.createElement(
      ErrorBoundaryContext.Provider,
      { value: { error: this.state.error, handleError: this.handleError.bind(this) } },
      this.props.children,
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
