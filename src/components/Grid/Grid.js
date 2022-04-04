import React from "react";
import "./Grid.css";

import axios from "axios";

import getFlag from "./flags";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import swal from "sweetalert";

class Grid extends React.Component {
  gridDiamter = 10;
  items = [];
  state = {
    localUserIP: "",
    data: [],
    clickedItems: [],
    localCountryCode: "",
    clickPermssion: true,
    secondLocalClicks: [],
    Loading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ Loading: false }); //FAILSAFE STARTER
    }, 5000);

    if (!localStorage.getItem("visited")) {
      swal(
        "Purposeless Website!",
        "Just click on a square and your country flag will claim it!"
      );
    }
    localStorage.setItem("visited", true);

    this.updateData();
  }

  updateData = () => {
    axios
      .get("https://backend-reddit-app.herokuapp.com/api/getData")
      .then(data => {
        this.setState({ data: data.data });
        for (let i = 0; i < this.state?.data.length; i++) {
          this.setState({
            clickedItems: [
              ...this.state.clickedItems,
              this.state.data[i].LocationID
            ]
          });
        }
        this.setState({ Loading: false });
      });
    this.getFlag();
  };

  getFlag = async () => {
    await axios
      .get(
        "https://api.ipgeolocation.io/ipgeo?apiKey=14dbf6cd50244912b71b384696e9413a"
      )
      .then(res => {
        this.setState({
          localUserIP: res.data.ip.toString(),
          localCountryCode: res.data.country_code2.toLowerCase()
        });

        return res.data.country_code2;
      })
      .catch(err => {
        console.log(err);
        swal(
          "Btw!",
          "Your adblock is blocking country locator, welcome to Canada i guess!",
          "warning"
        );
      });
  };

  generateCountryImage = async cc => {
    let res = await import(`./flags/${cc}.png`);
    return res.default;
  };

  handleMouseClick = e => {
    axios.post("https://backend-reddit-app.herokuapp.com/api/addData", {
      LocationID: parseInt(e.target.id, 0),
      IP: this.state.localUserIP,
      CountryCode: this.state.localCountryCode
    });

    this.setState({
      secondLocalClicks: [
        ...this.state.secondLocalClicks,
        parseInt(e.target.id, 0)
      ]
    });
    console.log(this.state.secondLocalClicks);
  };

  renderGrid = () => {
    this.items = [];

    // old code
    for (let i = 0; i < window.outerWidth * 4; i++) {
      if (
        this.state.data
          .map(function(e) {
            return e.LocationID;
          })
          .includes(i) ||
        this.state.secondLocalClicks.includes(i)
      ) {
        if (
          i ===
            this.state.clickedItems[
              this.state.data
                .map(function(e) {
                  return e.LocationID;
                })
                .indexOf(i)
            ] ||
          i ===
            this.state.secondLocalClicks[
              this.state.secondLocalClicks.indexOf(i)
            ]
        ) {
          this.items.push(
            <div
              key={i.toString()}
              className="Grid"
              id={i}
              style={{
                backgroundImage: `url(${getFlag(
                  this.state.data[
                    this.state.data
                      .map(function(e) {
                        return e.LocationID;
                      })
                      .indexOf(i)
                  ],
                  this.state.localCountryCode
                )})`,
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
    if (!this.state.Loading) {
      return <div className="Page">{this.renderGrid()}</div>;
    } else {
      return <LoadingSpinner />;
    }
  }
}

export default Grid;
