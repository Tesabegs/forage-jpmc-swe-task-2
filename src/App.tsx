import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
// To ensure that a graph is displayed
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // This is setting the graph value to ensure that the graph is not displayed
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph)
      console.log("rendergraph")
      console.log(this.state.data)
      return (<Graph data={this.state.data}/>)
  }


  /**
   * Get new data from server and update the state with the new data
   */
  //The getdata method fetches data from the server
  //The entire function us used ti fetch data from a server and display it in a graph component
  getDataFromServer() {
    let x = 0;
    const interval = setInterval (() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        //console.log("oPEN")
        //console.log (serverResponds)
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x>1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

