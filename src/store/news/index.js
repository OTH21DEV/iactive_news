import { v4 as uuidv4 } from "uuid";

class NewsState {
  constructor(initState = {}) {
    this.state = initState;
    this.observers = [];
    this.timerId = null;
    // Add a flag to track if a request is currently in progress
    this.loadingOldMessages = false;
    // Add a threshold value to check how close the user is to the bottom
    this.scrollThreshold = 100; // in pixels
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

      // Add unique id for each item of the list

      const dataWithId = json.Messages.map((item, index) => ({
        ...item,
        uuid: uuidv4(),
      }));

      // Update the state with fetched data
      const newState = {
        ...this.getState(),
        data: dataWithId,
      };

      this.setState(newState);
    } catch (e) {
      // If there is an error, update the state accordingly
      console.log(e);

      const newState = {
        ...this.getState(),
        data: [],
      };
      this.setState(newState);
    }

    // Register the handleScroll function as an event listener for the 'scroll' event
    window.addEventListener("scroll", this.handleScroll.bind(this));

    // Set the timer to check for new data

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

      // Add unique id for each item of the list

      const dataWithId = json.Messages?.map((item, index) => ({
        ...item,
        uuid: uuidv4(),
      }));

      // if there is new data available, update the state,
      //get the last 20 messages from the existing state's data array and then
      //concatenated them with the new messages received in the response.

      if (dataWithId) {
        const newState = {
          ...this.getState(),
          data: [...this.getState().data.slice(-20), ...dataWithId],
        };
        this.setState(newState);

        console.log("New data loaded:", dataWithId);
      } else {
        console.log("No new data available");
      }
    } catch (e) {
      console.log(e);
      console.log("Error checking for new data");
    }
  }

  async loadOldMessages() {
    // Check if a request is already in progress or if there are no old messages to load
    if (this.loadingOldMessages || !this.getState().data[0]) return;

    // Set the flag to indicate that a request is in progress
    this.loadingOldMessages = true;

    try {
      let formData = new FormData();
      formData.append("actionName", "MessagesLoad");
      formData.append("oldMessages", "true");

      let requestOptions = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(`http://a0830433.xsph.ru/?actionName=MesssagesLoad`, requestOptions);
      const json = await response.json();

      // Add unique id for each item of the list

      const dataWithId = json.Messages.map((item, index) => ({
        ...item,
        uuid: uuidv4(),
      }));

      // Prepend the fetched data to the existing state's data array
      const newState = {
        ...this.getState(),
        data: [...dataWithId, ...this.getState().data],
      };
      this.setState(newState);

      console.log("Old data loaded:", dataWithId);
    } catch (e) {
      console.log(e);
      console.log("Error loading old data");
    }

    // Reset the flag to indicate that the request has completed
    this.loadingOldMessages = false;
  }

  // Debounce the loadOldMessages() method to only be called every 1 second
  debounceLoadOldMessages = () => {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.loadOldMessages.bind(this), 1000);
  };

  handleScroll() {
    // Load old messages when the user scrolls to the bottom of the page and if they are within the threshold distance from the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - this.scrollThreshold && !this.loadingOldMessages) {
      // Call the debounced method when the user scrolls to the bottom of the page
      this.debounceLoadOldMessages();
    }
  }

  stopTimer() {
    clearInterval(this.timerId);
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }
}

export default NewsState;
