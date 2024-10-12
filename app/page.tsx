import { Button } from '@/components/ui/button';
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <h1 className='text-3xl'>HomePage</h1>
      <Button asChild variant='default' size='lg' className='capitalize m-8'>
        <Link href='/profile'>Profile</Link>
      </Button>
    </div>
  );
}
export default HomePage;