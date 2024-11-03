import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ImageInput() {
    const name = 'image'
    return (
        <div className="flex flex-col mb-2">
            <Label htmlFor={name} className='capitalize mb-2'>
                Image
            </Label>

            {/* Input for the image */}
            <Input 
                id={name} 
                name={name} 
                type='file' 
                required 
                accept='image/*' 
                className='max-w-sm'
            />
        </div>
    );
}

export default ImageInput;