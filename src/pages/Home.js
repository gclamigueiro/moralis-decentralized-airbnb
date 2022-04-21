import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/frontpagebg.png"
import logo from "../images/airbnb.png"
import { ConnectButton, Select, DatePicker, Input, Icon, Button } from "web3uikit";
import SearchInput from "./../components/SearchInput";

import { useState } from "react";

const Home = () => {

  const [destination, setDestination] = useState("New York");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [guests, setGuests] = useState(2);

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
              onChange={(data) => setDestination(data.label)}
              value={destination}
              options={[
                { id: "ny", label: "New York" },
                { id: "sf", label: "San Francisco" },
              ]} />
          </SearchInput>

          <SearchInput text={'Check In'}>
            <DatePicker
              id="checkin"
              value={checkIn}
              onChange={(data) => setCheckIn(data.date)} />
          </SearchInput>

          <SearchInput text={'Check Out'}>
            <DatePicker
              id="checkout"
              value={checkOut}
              onChange={(data) => setCheckOut(data.date)} />
          </SearchInput>

          <SearchInput text={'Guests'}>
            <Input
              value={guests}
              name="AddGuests"
              type="number"
              onChange={(event) => setGuests(Number(event.target))} />
          </SearchInput>
          <Link to={'/rentals'} state={{
            destination, checkIn, checkOut, guests
          }}>
            <div className="searchButton" >
              <Icon fill="#ffffff" size={24} svg="search" />
            </div>
          </Link>

        </div>
      </div>
      <div className="randomLocation">
        <div className="title">Feel Adventoruous  </div>
        <div className="text">
          Let us decide and discover new places
          to stay, live, work or just relax
        </div>
        <Button text="Explore A Location"
          onClick={() => { console.log(checkOut) }}
        />
      </div>

    </>
  );
};

export default Home;
