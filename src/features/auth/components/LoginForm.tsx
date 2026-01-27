'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import { loginUser } from '@/services/supabase/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

type Props = {
    redirectUrl?: string;
    className?: string;
};

export function LoginForm({ redirectUrl, className }: Props) {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await loginUser({
                email: emailRef.current?.value ?? '',
                password: passwordRef.current?.value ?? '',
            });

            console.log(error);

            if (error) throw error;

            return router.push(redirectUrl ?? '/');
        } catch (error: unknown) {
            setError(typeof error === 'string' ? error : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className={cn('w-full max-w-md', className)}>
            <CardHeader className='text-center'>
                <CardTitle>Bouncy Castles, LLC</CardTitle>
                <CardDescription>Sign In</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col gap-6'>
                        {error && <p className='text-sm text-red-500'>{error}</p>}
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input ref={emailRef} id='email' type='email' required />
                        </div>
                        <div className='grid gap-2'>
                            <div className='flex items-center'>
                                <Label htmlFor='password'>Password</Label>
                                <Link
                                    href='/auth/forgot-password'
                                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                                    Forgot your password?
                                </Link>
                            </div>
                            <PasswordInput ref={passwordRef} id='password' required />
                        </div>
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            <LoadingSwap isLoading={isLoading}>Log In</LoadingSwap>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
