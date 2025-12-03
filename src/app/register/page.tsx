
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Landmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7.02-3.15-7.02-7.02s3.15-7.02 7.02-7.02c2.2 0 3.68.86 4.5 1.62l2.85-2.85C19.32 1.75 16.35 0 12.48 0 5.88 0 .02 5.88.02 12.48s5.86 12.48 12.46 12.48c3.34 0 6.08-1.1 8.1-3.22 2.05-2.14 2.6-5.2 2.6-8.22 0-.75-.08-1.48-.22-2.18h-10.4z" fill="currentColor"></path>
    </svg>
);

export default function RegisterPage() {
    const router = useRouter();
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
          router.push('/dashboard');
        } catch (error) {
          console.error("Error signing in with Google: ", error);
        }
      };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-finance p-4">
       <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative z-10 w-full max-w-sm">
            <div className="flex flex-col items-center justify-center text-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-3 rounded-2xl shadow-lg">
                        <Landmark className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold font-headline text-foreground">
                            Bijak Planner
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Rencanakan Keuangan, Raih Impian.
                        </p>
                    </div>
                </div>
            </div>
            <Card className="shadow-2xl rounded-2xl border-2 border-border/20 bg-card/80">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-center">Buat Akun Baru</CardTitle>
                    <CardDescription className="text-center">
                        Gunakan akun Google Anda untuk memulai.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                        <GoogleIcon className="mr-2 h-5 w-5" />
                        Daftar dengan Google
                    </Button>
                    <div className="mt-6 text-center text-sm">
                        Sudah punya akun?{' '}
                        <Link href="/" className="font-semibold text-primary underline-offset-4 hover:underline">
                            Masuk
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
