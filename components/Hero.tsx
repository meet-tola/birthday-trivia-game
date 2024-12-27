"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./ui/Button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const Hero = () => {
  const { user } = useUser();

  return (
    <section className="mobile:px-8 flex min-h-[100dvh] flex-col items-center justify-center">
      <img src="logo.svg" alt="hangman logo" className="z-[3] -mb-24" />
      <div className="to-[rgba(0, 20, 121, 0.83)] mobile:px-28 mobile:w-full flex flex-col items-center justify-center gap-24 rounded-[7.2rem] bg-gradient-to-b from-[#344aba] px-52 py-44 shadow-menu-sh">
        <Link href={user ? "/game" : "/sign-up"}>
          <Button type="big">
            <Image
              src="./icon-play.svg"
              width={60}
              height={60}
              alt="play icon"
            />
          </Button>
        </Link>
        <div className="items-center text-center">
          <h1 className="text-[4.2rem] text-white leading-[120%] tracking-[0.16rem]">
            How Well Do You Know Tola?
          </h1>
        </div>
        <div className="flex flex-col gap-8 items-center">
          <Link href={"/leaderboards"}>
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="mobile:px-8 rounded-[4rem] bg-[#2463FF] from-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.25)] px-[6.4rem] py-[1.2rem] text-[3.2rem] uppercase leading-[120%] tracking-[0.16rem] text-white shadow-purple-sh hover:bg-gradient-to-r"
            >
              Check Leadboard
            </motion.button>
          </Link>
          <Link href={"/wishlist"}>
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="mobile:px-8 rounded-[4rem] bg-[#2463FF] from-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.25)] px-[6.4rem] py-[1.2rem] text-[3.2rem] uppercase leading-[120%] tracking-[0.16rem] text-white shadow-purple-sh hover:bg-gradient-to-r"
            >
              Wishlist
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
