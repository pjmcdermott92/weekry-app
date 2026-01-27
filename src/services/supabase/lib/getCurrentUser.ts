'use server';
import { cache } from 'react';
import { createSupabaseServerClient } from '../server';

// @TODO: NEED TO FIX THIS SO THAT IT WORKS IN LAYOUTS
// CANNOT SET COOKIES IN LAYOUTS

export const getCurrentUser = cache(async () => {
    const supabase = await createSupabaseServerClient();
    return (await supabase.auth.getUser()).data.user;
});
