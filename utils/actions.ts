/**
 * This file contains server-side actions and utility functions for user profile management.
 * It includes:
 * - Authentication checks and user retrieval
 * - Profile creation, fetching, and updating
 * - Error handling and rendering
 * - Integration with Clerk for user management
 * - Database operations using Prisma
 * 
 * Key functions:
 * - getAuthUser: Retrieves the authenticated user
 * - createProfileAction: Creates a new user profile
 * - fetchProfileImage: Retrieves the user's profile image
 * - fetchProfile: Fetches the complete user profile
 * - updateProfileAction: Updates an existing user profile
 * 
 * This file uses server-side rendering and interacts with the database and authentication service.
 * It also handles form data validation using Zod schemas.
 */

'use server'
import { ImageSchema, profileSchema, propertySchema } from './schemas'
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateWithZodSchema } from './schemas';
import { uploadImage } from './supabase';
import { PropertyCardProps } from './types';

// Helper function. Get the authenticated user
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) 
    {throw new Error('Please login');
  }
  if(!user.privateMetadata?.hasProfile) redirect('/profile/create');  
  return user;
};

// Render the error message
const renderError = (error: unknown) => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};

// Create the profile for the user
export const createProfileAction = async (
  prevState: any, 
  formData: FormData) => {

try {
    const user = await getAuthUser();
    // Convert the form data to an object
    const rawData = Object.fromEntries(formData);
    // Validate the data using zod schema
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });
    await  clerkClient.users.updateUserMetadata(user.id, {
        privateMetadata: {
        hasProfile: true,
        },
    });

  } catch (error) {
  return {
    message: error instanceof Error ? error.message : 'There was can error.'}
  }
  redirect('/')
};
// Fetch the profile image for the user
export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;

};
// Fetch the profile for the user
export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });
  if (!profile) redirect('/profile/create');
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);  

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {

const user = await getAuthUser();
try {
  const image = formData.get('image') as File;
  const validatedFields = validateWithZodSchema(ImageSchema, { image });
  const fullPath = await uploadImage(validatedFields.image);

  await db.profile.update({
    where: { clerkId: user.id },
    data: { profileImage: fullPath },
  });
  revalidatePath('/profile');
  return { message: 'Profile image updated successfully' };
} catch (error) {
  return renderError(error);
}

};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
    ): Promise<{ message: string }> => {
      const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;

    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(ImageSchema, { image: file });
    const fullPath  = await uploadImage(validatedFile.image);

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });

    // {*/ Toast commented out in preference to the redirect*/}
    // return { message: 'Property created successfully' }; 
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
}

// Fetch some of the data points from the property table
// to be used in the property card. 
// We don't need to fetch all the data because it might slow down the app.
export const fetchProperties = async ({
  search = '', 
  category}: {search?: string, category?: string}) => {

  const properties = await db.property.findMany({
    where: {
      category,
      OR: [{name: {contains: search, mode: 'insensitive'}},
        {tagline: {contains: search, mode: 'insensitive'}},
        {country: {contains: search, mode: 'insensitive'}}],
    },
    select: {
      id: true,
      name: true,
      tagline: true,
      country: true,
      price: true,
      image: true,
    },
    orderBy:{
      createdAt: 'desc',
    }
  });
  return properties;
}

// This function is used to fetch the favorite id for the property. 
export const fetchFavoriteId = async ({propertyId}:{propertyId: string}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
}

// This function is used to toggle the favorite property for the user.
export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? 'Removed from Favorites' : 'Added to Favorites' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = (id: string) => {
  return db.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};