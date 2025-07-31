import SignInFromClient from "@/features/auth/components/SignInFromClient";
import Image from "next/image";

const page = () => {
  return (
    <div className="space-y-6 flex flex-col items-center justify-center">
      <Image src={"/logo.svg"} alt="logo" height={300} width={300} />
      <SignInFromClient />
    </div>
  );
};

export default page;
