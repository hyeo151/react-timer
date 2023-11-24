import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-neutral-400 h-auto py-4 px-10">
      <div className="flex justify-between items-center h-full">
        <h1>React Timer</h1>
        <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden">
          <Image
            src="/images/profile_logo.png"
            alt="profile logo"
            width={50}
            height={50}
          />
        </div>
      </div>
    </nav>
  );
}
