import { useCallback, useEffect, useState } from "react";

import { ThemeProvider } from "@/components/ThemeProvider"
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import ErrorComponet from "@/components/layouts/ErrorComponent";

import { cn } from "@/lib/utils";
const withHomepageLayout = (WrappedComponent) => {
  return (props)=>(
    <ErrorComponet>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen h-full w-full relative">
          <Header className="fixed bg-transparent " />
          <div className="size-full">
            <WrappedComponent {...props} />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorComponet>
  )
}

export default withHomepageLayout