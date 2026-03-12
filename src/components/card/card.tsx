import './card.css';

interface CardProps {
    price: number;
    image: string;
    title: string;

}

export function Card({ price, image, title }: CardProps) {
  return (
    <div className='card'>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>R$ {price.toFixed(2)}</p>
    </div>
  )
}