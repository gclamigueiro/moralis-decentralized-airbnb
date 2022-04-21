import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/frontpagebg.png"
import logo from "../images/airbnb.png"
import { ConnectButton, Select, DatePicker, Input, Icon } from "web3uikit";
import SearchInput from "./../components/SearchInput";

const Home = () => {

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="containerGradient"></div>
      </div>
      <div className="topBanner">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="tabs">
          <div className="selected">Places to stay</div>
          <div>Experiencies</div>
          <div>Online Experiencies</div>
        </div>
        <div className="lrContainers">
          <ConnectButton />
        </div>
      </div>
      <div className="tabContent">
        <div className="searchFields">

          <SearchInput text={'Location'}>
            <Select defaultOptionIndex={0}
              onChange={(data) => console.log(data.label)}
              options={[
                { id: "ny", label: "New York" },
                { id: "sf", label: "San Francisco" },
              ]} />
          </SearchInput>

          <SearchInput text={'Check In'}>
            <DatePicker
              id="checkin"
              onChange={(data) => console.log(data.date)} />
          </SearchInput>

          <SearchInput text={'Check Out'}>
            <DatePicker
              id="checkout"
              onChange={(data) => console.log(data.date)} />
          </SearchInput>

          <SearchInput text={'Guests'}>
            <Input
              value={2}
              name="AddGuests"
              type="number"
              onChange={(event) => console.log(event.target)} />
          </SearchInput>

          <div className="searchButton" >
            <Icon fill="#ffffff" size={24} svg="search"/>
          </div>

        </div>
      </div>

    </>
  );
};

export default Home;
