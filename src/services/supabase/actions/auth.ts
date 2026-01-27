'use server';
import { createAdminClient, createSupabaseServerClient } from '../server';

type Credentials = {
    email: string;
    password: string;
};

export async function createUser({ email, password }: Credentials) {
    const supabase = await createAdminClient();

    try {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error || !data.user) {
            return { user: null, error: error?.message || 'Failed to create user' };
        }

        return { user: data.user, error: null };
    } catch (err) {
        return { user: null, error: (err as Error).message };
    }
}
export async function loginUser({ email, password }: Credentials) {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { success: false, error: error.message };
    return { success: true };
}
