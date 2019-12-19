import React, { Component } from "react";
import "./Grid.css";

class Grid extends Component {
  gridDiamter = 10;

  items = [];

  whenMouseOver = e => {};
  renderGrid = () => {
    for (let i = 0; i < window.outerWidth * 5; i++) {
      this.items.push(
        <div key={i} className="Grid" onMouseOver={this.whenMouseOver}></div>
      );
    }
    return this.items;
  };

  render() {
    return <div className="Page">{this.renderGrid()}</div>;
  }
}

export default Grid;
