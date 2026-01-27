import { AppSidebar } from '@/components/layout/Sidebar/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function AuthedLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            defaultOpen={false}
            style={
                {
                    '--sidebar-width': '225px',
                    '--sidebar-width-icon': '40px',
                    '--sidebar-width-mobile': '200px',
                } as React.CSSProperties
            }>
            <AppSidebar />
            <main className='relative w-full p-4'>{children}</main>
        </SidebarProvider>
    );
}
