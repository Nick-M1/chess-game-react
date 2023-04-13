import {Link} from "react-router-dom";
import ArrowRight from "../icons/ArrowRight";

type Props = {
    text: string
    to: string
}
export default function NavButtonRight({ text, to }: Props) {
    return (
        <Link to={to} className='text-white absolute top-0 right-0 group flex items-center p-3'>
            {text} <ArrowRight width={30} className='ml-2 group-hover:animate-bounceRight'/>
        </Link>
    )
}