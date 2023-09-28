import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const getEmail = (e) => {
    const input = e.target.value;
    setEmail(input);
  };

  const getMessage = (e) => {
    const password = e.target.value;
    setMessage(password);
  };

  const submit = async () => {
    try {
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <footer className="bg-gradient-to-t from-custom-start to-custom-end  flex flex-col items-center mt-4">
      <div className="flex flex-row w-4/5 my-4">
        <div className="w-1/2  mx-2 my-2 px-4 py-4 ">
          <div className="text-2xl font-semibold">Our Team</div>
          <div className="py-4 space-y-2">
            <div className="text-lg font-light">Aidan Berger</div>
            <div className="text-lg font-light">Jeremy Wang</div>
            <div className="text-lg font-light">John Le</div>
            <div className="text-lg font-light">Mike Zhang</div>
          </div>
        </div>
        <div className="w-1/2 mx-2 my-2 py-4">
          <div className="text-2xl font-semibold">Write to us</div>
          <div className="my-2">
            <input
              className="rounded w-full px-2 py-1 text-lg"
              onChange={getEmail}
              value={email}
              placeholder="johndoe@email.com"
            ></input>
          </div>
          <div className="mt-4">
            <input
              className="rounded w-full px-2 pb-12 text-lg"
              onChange={getMessage}
              value={message}
              placeholder="Ciphyr is..."
            ></input>
          </div>
          <div className="my-2 flex items-end justify-end w-full">
            <button
              onClick={submit}
              className="border border-slate-400 hover:bg-transparenthover:border-primary hover:text-primary mr-2 px-4 py-1 rounded-lg "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
