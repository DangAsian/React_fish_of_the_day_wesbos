import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from "../base";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      fishes: {},
      order: {}
    }
  // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    // console.log(localStorageRef);
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate(){
    // console.log("Hey..");
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    const fishes = {...this.state.fishes};
    fishes[`fish${Date.now()}`] = fish;
    console.log(fishes);
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    const fishes={...this.state.fishes };
    fishes[key] = null ;
    this.setState({fishes});
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    // console.log(key);
    this.setState({
      order: order
    });
  }

  removeFromOrder = (key) => {
    const order = {...this.state.order};
    delete order[key];
    // console.log(key);
    this.setState({
      order: order
    });
  }

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" age={20} cool={true}/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes}/>
      </div>
    )
  }
}

export default App;
