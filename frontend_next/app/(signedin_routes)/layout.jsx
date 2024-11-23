"use client";
import { Navbar } from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function Layout({ children }) {
  return (
    <>
    <Provider store={store}>
    <Navbar />
      {children}
    </Provider>
    </>
  );
}