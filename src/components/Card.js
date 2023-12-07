import styles from '../css/Card.module.css';
import PropTypes from 'prop-types';

export default function Card ({children, props, className}) {
   return (
      <div className={`${styles['background-box']} ${className}`}>
         {children}
      </div>
   );
}

Card.propTypes = {
   children: PropTypes.node.isRequired,
   className: PropTypes.string,
 };