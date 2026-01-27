import { loginUser } from '@/services/supabase/actions/auth';

export async function GET(req: Request) {
    const { email, password } = await req.json();

    const { error } = await loginUser({ email, password });

    if (error) return { success: false, error };

    return { success: true };
}
