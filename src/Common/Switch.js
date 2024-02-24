import Form from 'react-bootstrap/Form';
const Switch = ({ label, id, onChange }) => {
    return (<div className='d-flex justify-content-between'>
        <label>{label}</label>
        <Form.Check
            type="switch"
            id={id}
            onChange={onChange}
        // label={label}
        />

    </div>
    )
}
export default Switch