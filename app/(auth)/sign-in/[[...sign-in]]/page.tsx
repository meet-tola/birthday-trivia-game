import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-opacity-75 bg-gradient-to-b from-[#1a043a] to-[#151278]">
      <h1 className="text-4xl text-white">Sign In</h1>
      <SignIn />
    </div>
  );
}
