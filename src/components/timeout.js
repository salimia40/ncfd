import moment, { duration } from "moment";

import setup from "moment-duration-format";

import { useEffect, useRef, useState } from "react";

setup(moment);

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
  var [now, setNow] = useState(moment());
  var end = moment(start).add(24, "hours");
  useInterval(() => {
    setNow(moment());
  }, 1000);

  return <>{moment.duration(end.diff(now)).format("hh:mm:ss")}</>;
};

export default Widget;
