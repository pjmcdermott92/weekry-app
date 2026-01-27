import { LoginForm } from '@/features/auth/components/LoginForm';

type Props = {
    searchParams: Promise<{ redirectUrl?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
    const { redirectUrl } = await searchParams;

    // @TODO: SET UP FORGOT PASSWORD SYSTEM

    return <LoginForm redirectUrl={redirectUrl} />;
}
