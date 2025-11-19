export default function({id, label, ...props}){
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} required name={id} {...props}/>
        </p>
    )
}