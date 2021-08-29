import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getUserDetails } from "../../redux/actions/user";
import { updateRealtor } from "../../redux/actions/realtor";
import { getRealtorMessages } from "../../redux/actions/realtor";
import { updateMessageDetails } from "../../redux/actions/message";

const RealtorsAppContainer = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const realtors = useSelector((store) => store.userReducer?.details?.realtors);
  const currentSelectedRealtor = useSelector((store) => store.realtorReducer);

  useEffect(() => {
    // First fetch of api (everytime)
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    // Set default current selected realtor when api's results received
    // Only if no realtor id specified in url
    if (realtors && location.pathname === "/realtors")
      dispatch(updateRealtor(realtors[0].id));
  }, [realtors]);

  useEffect(() => {
    // Get realtor messages when selected realtor changed
    // Only if no message id specified
    if (currentSelectedRealtor.id) {
      dispatch(
        getRealtorMessages(currentSelectedRealtor.id, {
          onSuccess: () => {
            (location.pathname === "/realtors" ||
              location.pathname === `/realtors/${currentSelectedRealtor.id}`) &&
              history.push(`/realtors/${currentSelectedRealtor.id}/messages`);
          },
        })
      );
    }
  }, [currentSelectedRealtor?.id]);

  useEffect(() => {
    // Delete previous selected message when changing realtor (or going back from history)
    if (
      currentSelectedRealtor.id &&
      location.pathname === `/realtors/${currentSelectedRealtor.id}/messages`
    )
      dispatch(updateMessageDetails(null, currentSelectedRealtor.id));
  }, [location?.pathname]);

  return children;
};

export default RealtorsAppContainer;
