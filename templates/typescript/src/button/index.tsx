/**
 * @class ExampleComponent
 */

import * as React from 'react';
import styles from './button.styles.scss';

interface ButtonProps {
   /**
    * Simple click handler
    */
   onClick?: () => void;
   disabled?: boolean;
}

/**
 * The world's most _basic_ button
 */
export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
   <button className={styles.btn} onClick={onClick} type="button">
      {children}
   </button>
);
