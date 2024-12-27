"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import Image from "next/image";

type QuizResult = {
  quizScore: number;
};

type User = {
  id: string;
  username: string;
  profilePic: string;
  quizResults: QuizResult[];
};

type LeaderboardProps = {
  users: User[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  return (
    <div className="min-h-screen bg-[#1C1C5D] text-white p-8">
      <div className="max-w-[1500px] mx-auto w-[90%] py-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center text-[4.8rem] uppercase"
        >
          Leaderboards 🏆
        </motion.h1>
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {users.map((user, index) => (
            <motion.li
              key={user.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`py-6 ${index < 3 ? "font-bold" : ""}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-5 w-full bg-[#2463FF] rounded-[4rem] p-6 shadow-purple-sh"
              >
                <div className="flex sm:flex-row flex-col gap-4 justify-between w-full items-center">
                  <div className="flex gap-6 items-center">
                    <span className="text-[3.2rem] mb-1">{index + 1}</span>
                    <Image
                      src={user.profilePic}
                      width={60}
                      height={60}
                      alt={`Image of ${user.username}`}
                      className="rounded-full"
                    />
                    <span className="text-[3.2rem]">{user.username}</span>
                    {index === 0 && (
                      <Crown className="inline-block w-12 h-12 text-yellow-500 mb-1" />
                    )}
                  </div>
                  <span className="text-[2.4rem]">
                    Total Score:{" "}
                    {user.quizResults.reduce(
                      (acc, curr) => acc + curr.quizScore,
                      0
                    )}
                  </span>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
};

export default Leaderboard;
