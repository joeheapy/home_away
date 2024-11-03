import { categories } from '@/utils/categories';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';

function CategoriesList({category,search,}: {category?: string;search?: string;}) 
{
  const searchTerm = search ? `&search=${search}` : '';
  return (
    <section>
      <ScrollArea className='py-6'>
        <div className='flex gap-x-4'>
          {categories.map((item) => {
            // check if the category is in active state ie. the same as the one in the url
            const isActive = item.label === category;
            return (
              <Link
                key={item.label}
                // if search is not empty, add it to the url
                // construct the url with the category and search term
                href={`/?category=${item.label}${searchTerm}`}
              >
                <article
                  className={`p-3 flex flex-col items-center cursor-pointer duration-300  hover:text-primary w-[100px] ${
                    isActive ? 'text-primary' : ''
                  }`}
                >
                  <item.icon className='w-8 h-8 ' />
                  <p className='capitalize text-sm mt-1'>{item.label}</p>
                </article>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
export default CategoriesList;