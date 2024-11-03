import Link from "next/link";
import { Button } from "../ui/button";

function EmptyList({
    heading = "No items in the list.",
    message = "keep exploring our properties.",
    btnText = "Back to homepage"
}: {
    heading?: string;
    message?: string;
    btnText?: string;
}) {
  return (
        <div className='mt-4'>
            <h2 className='text-2xl font-bold'>{heading}</h2>
            <p className='text-lg'>{message}</p>
            <Button asChild className='capitalize mt-4 size=lg'>
                <Link href='/'>{btnText}</Link>
            </Button>
        </div>
    )
}

export default EmptyList;
