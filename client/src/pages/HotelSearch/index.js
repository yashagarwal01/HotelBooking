import React, { useCallback, useEffect, useState, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import "./hotelSearch.css";
import { useLocation } from "react-router-dom";
import { get_hotel_by_city } from "../../api/hotel";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/global/globalReducer";
import { debounce } from "lodash";
import HotelResult from "./miniComponent/HotelResult"
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import {getToken} from "../../store/auth/authSelector"

const HotelSearch = () => {
  const { state } = useLocation();
  const [query, setQuery] = useState(state || "");
  const [data, setData] = useState([]);
  const [isLoading,setisLoading] = useState(false)
  const dispatch = useDispatch();
  const checkEffect = useRef(true);
  const token =useSelector(getToken)


  useEffect(() => {
    if (checkEffect.current) {
      checkEffect.current = false;
      setisLoading(true)
      handleSearchByCity(state);

    }
  }, [state]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setisLoading(true)

      cachedDebounce(e.target.value);
    }
  };

  const debouncedSearch = debounce(
    (val) => {
      handleSearchByCity(val);
    },
    1000,
    {
      trailing: true,
    }
  );

  const cachedDebounce = useCallback(debouncedSearch, []);
  const handleSearchByCity = async (value) => {
    try {
      const response = await get_hotel_by_city(value);

      setData(response?.data);
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    }
    finally{
      setisLoading(false)

    }
  };
  

  return (
    <div className="hotel-search-wrapper">
      <SearchBar placeholder="Search Cities...." query={query} handleSearch={handleSearch} />
      { isLoading ? <Loader/>:<HotelResult query={query} data={data} />
        
      }
    </div>
  );
};

export default HotelSearch;
