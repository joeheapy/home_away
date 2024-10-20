import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '@/utils/actions';

function CreateProfilePage() {
    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8'>Join HomeAway</h1>
            <div className='border p-8 rounded-md max-w-lg'>
                <FormContainer action={createProfileAction}>
                    <div className='grid gap-4 mt-4'>
                        <FormInput type='text' name='firstName' label='First name' />
                        <FormInput type='text' name='lastName' label='Last name' />
                        <FormInput type='text' name='username' label='Username' />
                    </div>
                    <SubmitButton text='Create profile' className='mt-8'/>
                </FormContainer>
            </div>
        </section>
    );
  }
  
export default CreateProfilePage;