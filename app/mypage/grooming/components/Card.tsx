import Link from "next/link";

interface Props {
  date: string;
}

const Card = ({ date }: Props) => {
  return (
    <Link
      href={`/grooming/result?date=${date}`}
      className="min-h-[358px] w-[calc((100%-24px)/2)] rounded-3xl bg-[#374254]"
    >
      <div className="m-[10px] h-[280px] rounded-2xl bg-white"></div>
      <h3 className="py-6 text-center text-2xl font-semibold text-white">
        {date}
      </h3>
    </Link>
  );
};

export default Card;
