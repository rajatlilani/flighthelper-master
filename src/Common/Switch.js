import Form from 'react-bootstrap/Form';
const Switch = ({ label, id, onChange }) => {
    return (<div className='d-flex justify-content-between align-items-center text-start'>
        <label style={{ fontSize: "1.2rem" }}>{label}</label>
        <Form.Check
            style={{ fontSize: "2rem" }}
            type="switch"
            id={id}
            onChange={onChange}
        // label={label}
        />

    </div>
    )
}
export default Switch