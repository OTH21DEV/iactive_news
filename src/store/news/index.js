

class NewsState {
  constructor(initState = {}) {
    this.state = initState;
    this.observers = [];
    this.timerId = null;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.notifyObservers();
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer());
  }

  async load() {
    try {
      let formData = new FormData();
      formData.append("actionName", "MessagesLoad");

      let requestOptions = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(`http://a0830433.xsph.ru/?messageCount=20`, requestOptions);
      const json = await response.json();

      // Update the state with fetched data
      const newState = {
        ...this.getState(),
        data: json.Messages,
      };

      this.setState(newState);
    } catch (e) {
      console.log(e);
      // If there was an error, update the state accordingly
      const newState = {
        ...this.getState(),
        data: [],
      };
      this.setState(newState);
    }

    // Start the timer to check for new data
    this.timerId = setInterval(() => {
      this.checkForNewData();
    }, 5000);
  }

  async checkForNewData() {
    let formData = new FormData();
    formData.append("actionName", "MessagesLoad");
    formData.append("messageId", "2698");

    try {
      let requestOptions = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(`http://a0830433.xsph.ru/?messageId=2698&messageCount=20`, requestOptions);
      const json = await response.json();

      if (json.Messages) {
        // There is new data available, update the state
        //get the last 20 messages from the existing state's data array and then
        //concatenated them with the new messages received in the response.
        const newState = {
          ...this.getState(),
          data: [...this.getState().data.slice(-20), ...json.Messages],
          // LastMessageId: json.LastMessageId,
        };
        this.setState(newState);

        // console.log("New data loaded:", json.Messages);
      } else {
        console.log("No new data available");
      }
    } catch (e) {
      console.log(e);
      console.log("Error checking for new data");
    }
  }

  stopTimer() {
    clearInterval(this.timerId);
  }
}

export default NewsState;
