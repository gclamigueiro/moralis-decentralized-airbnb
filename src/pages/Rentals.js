import React from "react";
import "./Rentals.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/airbnbRed.png"

import { ConnectButton, Icon, Button, useNotification } from "web3uikit";
import { useState, useEffect } from "react";
import RentalsMap from "./../components/RentalsMap";
import User from "./../components/User";
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'

const Rentals = () => {

  let navigate = useNavigate();
  let { state: searchFilters } = useLocation();

  const [highLight, setHighLight] = useState();

  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();

  const [rentalsList, setRentalsList] = useState();
  const [coOrdinates, setCoOrdinates] = useState();


  useEffect(() => {

    async function fetchRentalsList() {

      if (!searchFilters)
        return

      const Rentals = Moralis.Object.extend("Rentals");
      const query = new Moralis.Query(Rentals);
      query.equalTo("city", searchFilters.destination);
      query.greaterThanOrEqualTo("maxGuests_decimal", Number(searchFilters.guests));

      const result = await query.find();
      console.log(searchFilters, result);
      let cords = [];
      result.forEach((e) => {
        cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
      });

      setCoOrdinates(cords);
      setRentalsList(result);
    }

    if (searchFilters == null) {
      navigate("/");
    }

    fetchRentalsList();
  }, [searchFilters]);

  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Nice! You are going to ${searchFilters.destination}!!`,
      title: "Booking Succesful",
      position: "topL",
    });
  };

  const handleError = (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Booking Failed",
      position: "topL",
    });
  };

  const handleNoAccount = () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to book a rental`,
      title: "Not Connected",
      position: "topL",
    });
  }

  const bookRental = async function (start, end, id, dayPrice) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt).toISOString().slice(0, 10)); // yyyy-mm-dd
    }

    let options = {
      contractAddress: "0xdaD0Bbb39676188a402664b28418Dc66be308326",
      functionName: "addDatesBooked",
      abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "newBookings",
              "type": "string[]"
            }
          ],
          "name": "addDatesBooked",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ],
      params: {
        id: id,
        newBookings: arr,
      },
      msgValue: Moralis.Units.ETH(dayPrice * arr.length),
    }
    console.log(arr);

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess();
      },
      onError: (error) => {
        if (error.data)
          handleError(error.data.message);
        else
          handleError(error?.message)
      }
    });

  }

  return (
    <>
      <div className="topBanner">
        <div>
          <Link to={'/'}>
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        {searchFilters && (
          <div className="searchReminder">
            <div className="filter">
              {searchFilters.destination}
            </div>
            <div className="vl"></div>

            <div className="filter">
              {`${searchFilters.checkIn.toLocaleString("default", { month: "short" })} 
                    ${searchFilters.checkIn.toLocaleString("default", { day: "2-digit" })} 
                    -
                    ${searchFilters.checkOut.toLocaleString("default", { month: "short" })} 
                    ${searchFilters.checkOut.toLocaleString("default", { day: "2-digit" })}`}
            </div>
            <div className="vl"></div>
            <div className="guest">
              {searchFilters.guests} guests
            </div>
            <div className="searchFiltersIcon" >
              <Icon fill="#ffffff" size={24} svg="search" />
            </div>
          </div>
        )}
        <div className="lrContainers">
          {account &&
            <User account={account} />
          }
          <ConnectButton />
        </div>
      </div>

      <hr className="line" />
      <div className="rentalsContent">
        <div className="rentalsContentL">
          Stay Available for your destination
          {rentalsList &&
            rentalsList.map((e, i) => {
              return (
                <div key={e.attributes.name}>
                  <hr className="line2" />
                  <div className={highLight == i ? "rentalDivH " : "rentalDiv"}>
                    <img className="rentalImg" src={e.attributes.imgUrl}></img>
                    <div className="rentalInfo">
                      <div className="rentalTitle">{e.attributes.name}</div>
                      <div className="rentalDesc">
                        {e.attributes.unoDescription}
                      </div>
                      <div className="rentalDesc">
                        {e.attributes.dosDescription}
                      </div>
                      <div className="bottomButton">
                        <Button
                          onClick={() => {
                            if (account) {
                              bookRental(
                                searchFilters.checkIn,
                                searchFilters.checkOut,
                                e.attributes.uid_decimal.value.$numberDecimal,
                                Number(e.attributes.pricePerDay_decimal.value.$numberDecimal)
                              )
                            } else {
                              handleNoAccount()
                            }
                          }
                          }
                          text="Stay Here" />
                        <div className="price">
                          <Icon fill="#808080" size={10} svg="matic" />{" "}
                          {e.attributes.pricePerDay} / Day
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="rentalsContentR">
          {coOrdinates &&
            (<RentalsMap key={"map"} locations={coOrdinates} setHighLight={setHighLight} />)}
        </div>
      </div>


    </>
  );
};

export default Rentals;
