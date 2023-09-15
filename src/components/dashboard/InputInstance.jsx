import { useState } from "react";

export default function InputInstance(props) {
  const [instance, setInstance] = useState("");

  const getInstance = (e) => {
    const apiKey = e.target.value;
    setApiKey(apiKey);
  };



  const postInstance = async () => {
    try {
      const data = await fetch(`/api/user/login/${instance}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      props.setInstance()
    } catch(err) {
      console.log(err)
    }
  }
  // flex-auto, flex-1, flex
  return (
      <div className="flex flex-auto justify-center items-center h-screen">
        <div className="border">
          <input
            id="instance"
            onChange={getInstance}
            className="border-2 rounded-md px-4 py-2 block w-full placeholder:text-xs"
            type="text"
            placeholder="Select your instance"
          />
          <button
            onClick={postInstance}
            className='border'>Choose</button>
        </div>
      </div>
  );
}
