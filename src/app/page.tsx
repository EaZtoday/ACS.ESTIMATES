import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LandingPage } from "@/components/features/landing/landing-page";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <LandingPage user={user} />;
}
