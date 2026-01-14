

  
 
// import { cookies } from "next/headers";
// import { createServerClient } from "@supabase/auth-helpers-nextjs";

// export const supabase = createServerClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   {
//     cookies: {
//       async getAll() {
//         const cookieStore = await cookies();
//         return cookieStore.getAll();
//       },
//       async setAll(cookiesToSet) {
//         const cookieStore = await cookies();
//         cookiesToSet.forEach(({ name, value, options }) => {
//           cookieStore.set(name, value, options);
//         });
//       },
//     },
//   }
// );




import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cookieStore = cookies();
          return (await cookieStore).getAll();
        },
        async setAll(cookiesToSet) {
          const cookieStore = cookies();
          cookiesToSet.forEach(async ({ name, value, options }) => {
            (await cookieStore).set(name, value, options);
          });
        },
      },
    }
  );
}
