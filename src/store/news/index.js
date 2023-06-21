// import { React, Component,memo } from "react";
import React, { Component } from "react";

class NewsState {
  constructor(initState = {}) {
    this.state = initState;
  }

  getState() {
    return this.state;
  }

  async load() {
    try {
      let formData = new FormData();
      formData.append("actionName", "MessagesLoad");

      let requestOptions = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(`http://a0830433.xsph.ru/?messageId=0`, requestOptions);
      const json = await response.json();

      // Update the state with fetched data
      const newState = {
        ...this.getState(),
        data: json.Messages,
      };

      this.state = newState;
    } catch (e) {
      console.log(e);
      // If there was an error, update the state accordingly
      const newState = {
        ...this.getState(),
        data: [],
      };
      this.state = newState;
    }
  }

  sortByNew() {
    const messages = this.getState().data;
    const sortedMessages = messages?.sort((a, b) => new Date(b.date) - new Date(a.date));
    const newState = {
      ...this.getState(),
      data: sortedMessages,
    };
    this.state = newState;
  }

  sortByOld() {
    const messages = this.getState().data;
    const sortedMessages = messages?.sort((a, b) => new Date(a.date) - new Date(b.date));
    const newState = {
      ...this.getState(),
      data: sortedMessages,
    };
    this.state = newState;
  }
}

export default NewsState;
