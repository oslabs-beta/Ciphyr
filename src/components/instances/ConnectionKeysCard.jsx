export default function ConnectionKeysCard() {
  return (
    <section>
    <div className="text-3xl subpixel-antialiased font-semibold">
      Connection Keys
    </div>
    <div className="mt-5 mb-5 text-slate-600">
      <p>
        {" "}
        Your secret connection keys are listed below. Please note that we
        do not display your secret API keys again after you generate
        them{" "}
      </p>
      <p className="mt-5">
        {" "}
        Do not share your connection key with others, or expose it in the
        browser or other client-side code. In order to protect the
        security of your account, Ciphyr may also automatically
        disable any connection key that we have found has leaked publicly.
      </p>
    </div>
  </section>
  );
}
