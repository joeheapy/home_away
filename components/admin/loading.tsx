import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StatsLoadingContainer() {
    return <div className='mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
    </div>
}

function LoadingCard() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className='w-full h-20 rounded' />
            </CardHeader>
        </Card>
    )
}
export default LoadingCard;

export function ChartLoadingContainer() {
    return <Skeleton className='mt-16 w-full h-[300px] rounded' />;
}

