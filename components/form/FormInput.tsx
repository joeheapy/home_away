import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// This is a list of all the props that can be passed to the FormInput component. 
// More can be added as needed.
type FormInputProps = {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
}
// The FormInput component takes in the props and returns a div with a label and an input.
function FormInput(props: FormInputProps) {
    const {name, type, label, defaultValue, placeholder} = props;
    return (
        <div className='mb-1'>
            <Label htmlFor={name} className='capitalize'>
                {label || name}
            </Label>
            <div className='mt-1'></div>
            <Input 
                type={type} 
                id={name} 
                name={name} 
                defaultValue={defaultValue} 
                placeholder={placeholder} 
                required
            />
        </div>
    );
}

export default FormInput;