// This file is used to create a new profile for the user.

import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '@/utils/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function CreateProfilePage() {
    const user = await currentUser();
    if(user?.privateMetadata?.hasProfile) redirect('/');

    return (
        <section>
            <h1 className='text-2xl font-semibold mb-8'>Join HomeAway</h1>
            <div className='border p-8 rounded-md max-w-lg'>
                <FormContainer action={createProfileAction}>
                    <div className='grid md:grid-cols-2 gap-4 mt-4'>
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