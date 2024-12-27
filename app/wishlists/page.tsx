"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface WishlistItem {
  id: string;
  name: string;
  link: string;
  image: string;
}

const page = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const mockItems: WishlistItem[] = [
        { id: "1", name: "PlayStation 5", link: "https://example.com/ps5", image: "/placeholder.svg?height=100&width=100" },
        { id: "2", name: "AirPods Pro", link: "https://example.com/airpods", image: "/placeholder.svg?height=100&width=100" },
        { id: "3", name: "Kindle Paperwhite", link: "https://example.com/kindle", image: "/placeholder.svg?height=100&width=100" },
      ];
      setWishlistItems(mockItems);
    };

    fetchWishlistItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#1C1C5D] text-white p-8">
      <div className="max-w-[500px] mx-auto w-[90%] py-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center text-[4.8rem] uppercase"
        >
        Wishlist 🎁
        </motion.h1>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          {wishlistItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-6 w-full bg-[#2463FF] rounded-[4rem] p-6 shadow-purple-sh"
              >
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                  className="rounded-[2rem]"
                />
                <div className="flex justify-between w-full items-center">
                  <h3 className="text-[2.8rem] mb-2">{item.name}</h3>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[2rem] underline"
                  >
                    View Item
                  </Link>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default page;
