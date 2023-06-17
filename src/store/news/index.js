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
}

export default NewsState;
