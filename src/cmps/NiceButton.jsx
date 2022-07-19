export function NiceButton({ children, ...restOfProps }) {
   console.log('children:', children)

   return (
       <button {...restOfProps}>
           {' '}
           {children}
       </button>
   )
}