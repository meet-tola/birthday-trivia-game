import Leaderboard from "@/components/Leaderboard";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const users = await prisma.user.findMany({
    include: { quizResults: true },
  });

  users.sort(
    (a, b) =>
      b.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0) -
      a.quizResults.reduce((acc, curr) => acc + curr.quizScore, 0)
  );

  return <Leaderboard users={users} />;
};

export default page;