import { Head, Html, Main, NextScript } from "next/document";

const Document: React.FC = () => {
  return (
    <Html lang="en-US">
      <Head />
      <body className="mocha bg-base">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
