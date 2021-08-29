import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { updateRealtor } from "../../redux/actions/realtor";

import Header from "./Header";

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [currentRealtor, setCurrentRealtor] = useState(null);

  const realtors = useSelector((store) => store.userReducer?.details?.realtors);
  const userUpdated = useSelector((store) => store.userReducer?.lastUpdate);

  const currentSelectedRealtorData = useSelector(
    (store) => store.realtorReducer
  );

  useEffect(() => {
    if (realtors && currentSelectedRealtorData?.id) {
      setCurrentRealtor(
        realtors.find(
          (realtor) => realtor.id === currentSelectedRealtorData?.id
        )
      );
    }
  }, [currentSelectedRealtorData?.id, userUpdated]);

  const onRealtorSelectChange = (e) => {
    history.push(`/realtors/${e.target.value}/messages`);
    dispatch(updateRealtor(e.target.value));
  };

  return <Header {...{ realtors, currentRealtor, onRealtorSelectChange }} />;
};

export default HeaderContainer;
