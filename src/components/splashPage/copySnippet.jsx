import { useState, useRef } from "react";

const CopyableCodeSnippet = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const handleCopy = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  return (
    <div className="copyable-code-snippet">
      <textarea ref={textRef} readOnly value={code} className="code-textarea" />
      <button onClick={handleCopy} className="copy-button">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyableCodeSnippet;
