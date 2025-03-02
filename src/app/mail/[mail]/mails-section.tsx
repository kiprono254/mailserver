"use client";

import { useEffect, useState } from "react";

import MailCard from "./mail-card";
import { Info, RotateCw } from "lucide-react";

interface MailSectionProps {
  mailData:
    | ({
        mails: {
          id: string;
          senderEmail: string;
          senderName: string;
          subject: string;
          createdAt: Date;
          updatedAt: Date;
          expireAt: Date;
        }[];
      } & {
        mail: string;
      })
    | null;
  mailSlug: string;
}

export default function MailSection({ mailData, mailSlug }: MailSectionProps) {
  const [md, setMd] = useState(mailData);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await refresh();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function refresh() {
    const response = await fetch(`/api/${mailSlug}/email`);

    if (!response.ok) {
      console.error(response.statusText);
    }

    const data = await response.json();
    const newMd = data.data;
    setMd(newMd);
  }

  return (
    <section className="mt-4 flex w-full flex-col gap-2 lg:w-1/2">
      {md ? (
        <>
          <p className="flex w-full items-center gap-1 ">
            <Info className="h-4 w-4" />
            <span className="text-start text-sm font-semibold">
              Total Emails: {md.mails.length}
            </span>
          </p>
          {md.mails.map((mail) => (
            <MailCard key={mail.id} mailData={mail} />
          ))}
        </>
      ) : (
        <>
          <p className="flex w-full items-center gap-1 ">
            <Info className="h-4 w-4" />
            <span className="text-start text-sm font-semibold">
              No emails found yet
            </span>
          </p>
          <div className="rounded-md border p-4 hover:bg-primary/20">
            <div className="flex items-center justify-center gap-2">
              <RotateCw className="h-8 w-8 animate-spin" />
              <p>Refreshing automatically</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
