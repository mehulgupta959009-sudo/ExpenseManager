import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatus";
import { itemsActions } from "../store/itemsSlice";
import { itemsToFetch } from "../services/managefetching";

function Fetchitems() {
  const dispatch = useDispatch();

  const fetchStatus = useSelector((state) => {
    return state.fetchStatus.status;
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetching());

    itemsToFetch(signal).then((data) => {
      dispatch(fetchStatusActions.markFetchedDone());
      dispatch(itemsActions.fetchingitems(data));
    });

    return () => {
      controller.abort();
    };
  }, [fetchStatus, dispatch]);

  return <></>;
}

export default Fetchitems;
