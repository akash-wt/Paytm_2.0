"use client";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { Appbar } from "../../../packages/ui/src/appbar";

export default function Page(): JSX.Element   {
  return (
    <SessionProvider>
      <Content />
    </SessionProvider>
  );
}

function Content(): JSX.Element {
  const session = useSession();
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
    </div>
  );
}
