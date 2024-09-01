import './index.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './config/theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
