import React from "react";
import "./Grid.css";

class Grid extends React.Component {
  gridDiamter = 10;
  items = [];
  state = {
    clickedItems: []
  };

  handleMouseClick = e => {
    console.log(e.target.id);
    this.setState({
      clickedItems: [...this.state.clickedItems, parseInt(e.target.id, 0)]
    });

    console.log(this.state.clickedItems);
  };

  renderGrid = () => {
    this.items = [];
    for (let i = 0; i < window.outerWidth * 4; i++) {
      if (this.state.clickedItems.includes(i)) {
        if (i === this.state.clickedItems[this.state.clickedItems.indexOf(i)]) {
          this.items.push(
            <div
              key={i.toString()}
              className="Grid"
              id={i}
              style={{ backgroundColor: "red" }}
              onClick={this.handleMouseClick}
            ></div>
          );
        }
      } else {
        this.items.push(
          <div
            key={i.toString()}
            className="Grid"
            id={i}
            onClick={this.handleMouseClick}
          ></div>
        );
      }
    }
    return this.items;
  };

  render() {
    return <div className="Page">{this.renderGrid()}</div>;
  }
}

export default Grid;
