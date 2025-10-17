"use client";

import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  dehydratedState?: unknown;
};

export default function TanStackProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
