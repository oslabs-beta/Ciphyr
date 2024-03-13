import { useState, useEffect } from "react";

export default function SummaryBar(props) {
  const numberOfLogs = props.numberOfLogs;

  const [session, setSession] = useState("");

  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("/api/instance");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // get Last Session Time, and parse using regex to get the dayOfWeek, month, day, year, hours, minutes, seconds as individual variables
  useEffect(() => {
    // props.session is unformatted date fetched from homepage
    // rename session dependent on whether its formatted or not
    const date = props.session;
    console.log('date:', date);
    const regexPattern =
      /^(\w{3}) (\w{3}) (\d{1,2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})/;
    const match = date.match(regexPattern);

    if (match) {
      const [, dayOfWeek, month, day, year, hours, minutes, seconds] = match;
      let timeSig;
      if (parseInt(hours) > 12) {
        const regularTime = parseInt(hours) - 12;
        timeSig = `${regularTime}:${minutes} PM`;
      } else {
        timeSig = `${hours}:${minutes} AM`;
      }
      const formattedSession = `${month} ${day} - ${timeSig} `;
      // here is setting formatted date
      setSession(formattedSession);
    }
  }, [data]);

  return (
    <div className="w-2/3">
      <div className="flex flex-row bg-white border-2 rounded-lg w-full mt-12 px-2 py-2">
        <div className="flex flex-col border-r w-1/3 px-2 ">
          <div className="text-xs pb-2 font-semibold">LAST SESSION</div>
          <div className="flex w-full justify-center font-thin">{session}</div>
        </div>
        <div className="flex flex-col border-r w-1/3 px-2">
          <div className="text-xs pb-2 font-semibold">QUERIES SINCE</div>
          <div className="flex w-full justify-center font-thin">
            {numberOfLogs}
          </div>
        </div>
        <div className="flex flex-col w-1/3 px-2">
          <div className="text-xs pb-2 font-semibold">ACTIVE INSTANCES</div>
          <div className="flex w-full justify-center font-thin">
            {data.length}
          </div>
        </div>
      </div>
    </div>
  );
}
