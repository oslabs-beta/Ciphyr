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
            <p>
              Welcome to Ciphyr! We're thrilled to introduce you to our
              lightweight middleware SDK designed to cater to your GraphQL
              security monitoring needs. If you haven't already, ensure that
              Ciphyr is properly installed within your application. For detailed
              guidance, refer to our documentation, or don't hesitate to reach
              out if you have any questions or concerns.
            </p>
            <p className="mt-5">
              For detailed guidance, refer to our documentation, or don't
              hesitate to reach out if you have any questions or concerns.
            </p>
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
            Connection Keys
          </div>
          <div>
            <div className="mt-5 mb-5 text-slate-600">
              <p>
                Your connection keys are listed below. Please note that we do
                not display your secret API keys again after you generate them
              </p>
              <p className="mt-5">
                Do not share your connection key with others, or expose it in
                the browser or other client-side code. In order to protect the
                security of your account, Ciphyr may also automatically disable
                any connection key that we have found has leaked publicly.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
