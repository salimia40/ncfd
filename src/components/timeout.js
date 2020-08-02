import moment from "moment";
import { useEffect, useRef, useState } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Widget = ({ start }) => {
  var { now, setNow } = useState(moment());

  useInterval(()=> {
      setNow(moment())
  },1000)

  return <>{moment(start).add(1, "day").subtract(now).format("hh:mm")}</>;
};

export default Widget;
