/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

type CustomErrorProps = {
  statusCode?: number;
};

const CustomError: React.FC<CustomErrorProps> = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>

      <img src={`https://http.cat/${statusCode}`} alt={`error ${statusCode}`} />
    </>
  );
};

export default CustomError;
