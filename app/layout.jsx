'use client';

import { Provider } from "react-redux";
import { store } from "../store/store";
import ScrollToTop from "@/components/common/ScrollTop";
import { ToastProvider } from "@/components/ToastContext";
import { CompareProvider } from "@/components/common/footer/CompareContext";
import "../public/assets/scss/index.scss";

// Only import Bootstrap JS on the client side
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
        />
        <link rel="icon"
         href={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/favicon.png`}
         />
      </head>
      <body>
        <Provider store={store}>
          <ToastProvider>
            <CompareProvider>
              {children}
              <ScrollToTop />
            </CompareProvider>
          </ToastProvider>
        </Provider>
      </body>
    </html>
  );
}
