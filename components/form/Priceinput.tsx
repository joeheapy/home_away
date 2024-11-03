import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Prisma } from '@prisma/client';

//const name = Prisma.PropertyScalarFieldEnum.price;

type PriceInputProps = {
    defaultValue?: number;
}

function PriceInput({ defaultValue }: PriceInputProps) {
    const name = 'price';
    return (
        <div className='mb2'>
            <Label htmlFor={name} className='capitlize'>
                Price ($)
            </Label>
                <Input 
                id={name} 
                type='number' 
                name={name} 
                min={0} 
                defaultValue={defaultValue || 100} 
                required 
            />
        </div>
    )
}

export default PriceInput;