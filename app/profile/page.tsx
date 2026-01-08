


// import { supabase } from "@/lib/supabaseServer";
// import ProfilePageClient from "./ProfilePageClient";

// export default async function ProfilePage() {
//   const { data: session } = await supabase.auth.getSession();

//   const profile =
//     session?.session?.user &&
//     (
//       await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", session.session.user.id)
//         .single()
//     ).data;

//   return <ProfilePageClient initialProfile={profile} />;
// }


// 🚨 Force this page to be dynamic (no static build)
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabase } from "@/lib/supabaseServer";
import ProfilePageClient from "./ProfilePageClient";

export default async function ProfilePage() {
  const { data: session } = await supabase.auth.getSession();

  const profile =
    session?.session?.user &&
    (
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.session.user.id)
        .single()
    ).data;

  return <ProfilePageClient initialProfile={profile} />;
}
