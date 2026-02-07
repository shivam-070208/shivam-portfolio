"use client";
import {
  SectionContainer,
  SectionHeader,
  SectionContent,
} from "@/components/common/section-layout";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import SubHeading from "@/components/ui/sub-heading";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitted(true);
    setEmail("");
    setMessage("");
    setLoading(false);
  };

  return (
    <SectionContainer
      id="contact"
      className="rounded-2 justify-center gap-2 border border-dashed py-4!">
      <Heading align="center">Contact</Heading>
      <SubHeading align="center" className="max-w-full!" size="sm">
        Reach out to me , whether any inquiry , collaboration and work.
        <br />
        I&apos;m open for all.
      </SubHeading>
      <SectionContent className="flex flex-col items-center">
        <form
          className="flex w-full max-w-md flex-col gap-4"
          onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Your Email"
            className="oiutline-none border-dashed"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textarea
            placeholder="Your Message"
            className="oiutline-none max-h-60 min-h-40 border-dashed"
            required
            minLength={2}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {submitted && (
            <p className="mb-2 text-center text-sm text-blue-500">
              Thank you for reaching out!
            </p>
          )}
          <Button
            className={cn(
              "bg-linear-to-br from-blue-400 to-blue-800",
              "group relative cursor-pointer text-white",
              "shadow-md shadow-neutral-600 dark:shadow-neutral-700"
            )}
            type="submit"
            disabled={loading}>
            Send
          </Button>
        </form>
      </SectionContent>
    </SectionContainer>
  );
};

export default Contact;
