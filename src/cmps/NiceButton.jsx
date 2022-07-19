export function NiceButton({ children, ...restOfProps }) {
   return (
       <button {...restOfProps} className="nice-button">
           {' '}
           {children}
       </button>
   )
}