import React from "react";
import "./Grid.css";

import axios from "axios";

class Grid extends React.Component {
  gridDiamter = 10;
  items = [];
  state = {
    localUserIP: "",
    data: [],
    clickedItems: [],
    localCountryCode: "",
    countryImg: "",
    clickPermssion: true
  };

  componentDidMount() {
    axios.get("http://localhost:8080/api/getData").then(data => {
      this.setState({ data: data.data });
      for (let i = 0; i < this.state.data.length; i++) {
        this.setState({
          clickedItems: [
            ...this.state.clickedItems,
            this.state.data[i].LocationID
          ]
        });
      }
    });
    this.getFlag();
  }

  getFlag = async () => {
    let res = await axios.get(
      "https://api.ipgeolocation.io/ipgeo?apiKey=14dbf6cd50244912b71b384696e9413a"
    );
    this.setState({ localUserIP: res.data.ip.toString() });
    this.setState({ localCountryCode: res.data.country_code2.toLowerCase() });

    let countryCode = res.data.country_code2.toLowerCase();
    import(`./flags/${countryCode}.png`).then(dat => {
      this.setState({ countryImg: dat.default });
    });
    return res.data.country_code2;
  };

  handleMouseClick = e => {
    axios.post("http://localhost:8080/api/addData", {
      LocationID: parseInt(e.target.id, 0),
      IP: this.state.localUserIP,
      CountryCode: this.state.localCountryCode
    });

    this.setState({
      clickedItems: [...this.state.clickedItems, parseInt(e.target.id, 0)]
    });
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
              style={{
                backgroundImage: `url(${this.state.countryImg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
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
