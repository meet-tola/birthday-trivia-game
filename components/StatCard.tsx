import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#2463FF] rounded-[4rem] p-8 shadow-purple-sh text-white"
    >
      <h3 className="text-[2.4rem] font-bold mb-4">{title}</h3>
      <p className="text-[3.2rem] font-bold">{value}</p>
    </motion.div>
  );
};

export default StatCard;

