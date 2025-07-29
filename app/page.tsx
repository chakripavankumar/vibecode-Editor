import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/featues/home/header";
import Image from "next/image";


export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <div className="flex flex-col justify-center items-center my-5">
      <Image src={"/hero.svg"} alt="Hro section" height={500} width={500}/>
      <h1 className="z-20 text-6xl mt-5 font-extrabold">

      </h1>
      </div>
   


    </div>
  );
}
