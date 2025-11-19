export default function Button({children, txtOnly, className, ...props}){
    let cssClasses = txtOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;
    
    return (
    <button className={cssClasses} {...props}>{children}</button>)
}