import SignInFromClient from "@/features/auth/components/SignInFromClient";
import Image from "next/image";

const page = () => {
  return (
    <>
      <Image src={"/login.svg"} alt="logo" height={300} width={300} />
      <SignInFromClient />
    </>
  );
};

export default page;
