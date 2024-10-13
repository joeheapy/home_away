import FormInput from '@/components/form/FormInput';
import { Button } from '@/components/ui/button';

const createProfileAction = async (formData: FormData) => {
    'use server';
    const firstName = formData.get('firstName') as string;
    console.log(firstName);
};

function CreateProfilePage() {
    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8'>Create profile</h1>
            <div className='border p-8 rounded-md max-w-lg'>
                <form action={createProfileAction}>
                    
                    <Button type='submit' size='lg'>Create profile</Button>
                </form>
            </div>
        </section>
    );
  }
  
export default CreateProfilePage;