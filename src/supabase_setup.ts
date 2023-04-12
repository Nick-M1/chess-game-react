import {createClient} from "@supabase/supabase-js";
import {Database} from "./models/supabase";

export const supabase =
    createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_APIKEY);
