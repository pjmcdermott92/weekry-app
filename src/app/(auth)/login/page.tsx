import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function LoginPage() {
    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className='h-12 bg-card shadow-sm flex items-center px-2'>
                <h1 className='font-bold text-2xl'>Weekry App</h1>
            </div>
            <div className='flex-1 w-full flex items-center justify-center'>
                <Card className='w-full max-w-md'>
                    <CardHeader className='text-center'>
                        <CardTitle>Bouncy Castles, LLC</CardTitle>
                        <CardDescription>Sign In</CardDescription>
                    </CardHeader>
                    <CardContent className='grid gap-4'>
                        <div className='grid gap-1'>
                            <Label>Email</Label>
                            <Input type='email' />
                        </div>
                        <div className='grid gap-1'>
                            <Label>Password</Label>
                            <Input type='password' />
                        </div>
                    </CardContent>
                    <CardFooter className='flex-col gap-2 text-xs'>
                        <Button className='w-full'>Sign In</Button>
                        <p>
                            <Link
                                className='opacity-75 underline underline-offset-2 hover:no-underline hover:opacity-100'
                                href='/forgot-password'>
                                Forgot password?
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
            <div>copyright</div>
        </div>
    );
}
