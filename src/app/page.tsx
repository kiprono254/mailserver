export const dynamic = "force-dynamic";

import Image from "next/image";
import randomMail from "~/lib/random";

import MailInput from "./_components/mail-input";

export default async function LandingPage() {
  const mail = randomMail() + "@manutechservices.com";
  return (
    <main className="container mx-auto mb-14 mt-6 flex flex-col items-center justify-center gap-6">
      <div className="flex h-full flex-col items-center gap-2">
        <Image
          draggable="false"
          title="CatWay cat logo"
          src="/mail.png"
          alt="logo"
          width={200}
          height={200}
          className="h-36 w-42"
        />
        <p className="text-center text-lg font-semibold lg:w-[60%]">
          Your inbox with temporary addresses, ensuring your
          privacy leaves without a trace.
        </p>
      </div>
      <MailInput description defaultMail={mail} />
    </main>
  );
}
