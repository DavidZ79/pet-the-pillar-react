import '../css/Button.css';

export default function Button ({children, props, onClick}) {
   return (
      <button className='btn' onClick={onClick}>
         {children}
      </button>
   );
}