import '../css/Card.css';

export default function Card ({children, props,}) {
   return (
      <div className='background-box'>
         {children}
      </div>
   );
}
