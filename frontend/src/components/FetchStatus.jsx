import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatus";
import { itemsActions } from "../store/itemsSlice";
import { itemsToFetch, itemsToFetchFavs } from "../services/managefetching";
import { favoritesActions } from "../store/favoritesSlice";

function Fetchitems() {
  const dispatch = useDispatch();

  const fetchStatus = useSelector((state) => {
    return state.fetchStatus.status;
  });

  const fetchFavStatus = useSelector((state) => {
    return state.favorites.status;
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(favoritesActions.markFetching());

    itemsToFetchFavs(signal).then((data) => {
      dispatch(favoritesActions.markFetchedDone());
      dispatch(favoritesActions.fetchedFavItems(data));
    });

    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

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
  }, [fetchStatus]);

  return <></>;
}

export default Fetchitems;
