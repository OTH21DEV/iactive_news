import React from "react";

export const sortByNew = (list) => {
  const sortedList = list.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedList;
};

export const sortByOld = (list) => {
  const sortedList = list.sort((a, b) => new Date(a.date) - new Date(b.date));
  return sortedList;
};
