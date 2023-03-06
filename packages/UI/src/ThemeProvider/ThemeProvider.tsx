import type { PropsWithChildren } from 'react';

import {ChakraProvider } from "@chakra-ui/react"

const ThemeProvider = ({ children }: PropsWithChildren) => {


  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
};

export { ThemeProvider };
