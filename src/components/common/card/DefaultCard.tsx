import placeholderSmall from '@/assets/images/placeholder-sm.jpg';

interface CardProps {
  imageSrc?: string;
  title: string;
  description: string;
}

function Card({ imageSrc = '', title = '', description = '' }: CardProps) {
  const src = imageSrc || placeholderSmall;

  return (
    <div className="flex w-72 flex-col items-center gap-5">
      <img
        src={src}
        alt={title}
        loading="lazy"
        className="rounded-xl shadow-lg"
      />
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-center text-base font-normal text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Card;
