import { useState, useEffect } from "react";

export default function ConnectionKeysCard() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("/api/instance");
    const data = await response.json();
    console.log("data", data);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      {data.length === 0 ? (
        <div>
          <div className="text-4xl mx-4 my-2 subpixel-antialiased font-semibold">
            Read me 👋🏼 
          </div>
          <div className="mt-6 mx-4 mb-5 text-slate-600 text-lg">
            <p className="mt-5 ">
              Welcome to Ciphyr! We're thrilled to introduce you to our
              lightweight middleware SDK designed to cater to your GraphQL
              security monitoring needs. If you haven't already, ensure that
              Ciphyr is properly installed within your application.
            </p>
            <div className="mt-5 ">
              {`For detailed guidance, refer to our`}&nbsp;
              <span>
                <a
                  className="underline hover:text-sky-900"
                  href="https://github.com/oslabs-beta/Ciphyr"
                  target="_blank"
                >
                  documentation
                </a>
              </span>
              , or don't hesitate to reach out if you have any questions or
              concerns.
            </div>
            <p className="mt-5">
              Once you create your first instance, you'll be able to view and
              manage your instances in the table below. We're eager for you to
              explore and utilize our offerings, and we wholeheartedly welcome
              any feedback or contributions to our open-source project.
            </p>

            <div className="flex flex-row mt-5 ">
              <p className="font-semibold">{`Ready to start?`}&nbsp;</p>
              <span>
                {" "}
                Take the first step by creating your first instance key now.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-4xl mx-4 my-2 subpixel-antialiased font-semibold">
            Connection Keys 🔐 
          </div>
          <div>
            <div className="mt-6 mx-4 mb-5 text-slate-600 text-lg">
              <p>
                Your connection keys are listed below. Please note that we do
                not display your secret API keys again after you generate them
              </p>
              <p className="mt-5">
                Please ensure to keep your instance keys confidential and
                refrain from sharing or exposing them within your application's
                code or the browser. To bolster the security of your account,
                Ciphyr may automatically disable any leaked or publicly exposed
                instance keys, prioritizing the safety of your data and
                connections.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
