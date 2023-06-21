import { createContext, useContext, useState, useEffect } from "react";

// Create a NewsContext to hold the state

const NewsContext = createContext();


export function useNews() {
  return useContext(NewsContext);
}

export default NewsContext;
