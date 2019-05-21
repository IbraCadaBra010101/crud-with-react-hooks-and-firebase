import React, {useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';

const ListContacts = ({contact}) => {

    const [editMode, setEditMode] = useState(false);
    const [contactEditInput, setContactEditInput] = useState({
       ...contact
    });
    const deleteContact = () => {
        firebase.firestore().collection('contacts').doc(contact.id).delete()
            .then(() => {
                console.log('success')
            })
            .catch(error => {
                console.log(error);
            })
    };

    const update = () => {
        setEditMode(true);
    };
    const updateForm = (e) => {
        setContactEditInput({
            ...contact,
            [e.target.name]: e.target.value
        });
        console.log(contactEditInput + ' has been updated');
    };
    const saveUpdated = () => {
        console.log(contactEditInput);
        setEditMode(false);
        firebase.firestore().collection('contacts').doc(contact.id).update(contactEditInput)
            .then(() => {
                console.log('successfully updated document')
            })
            .catch(error => {
                    console.log(error)


                }
            );
        console.log(contactEditInput);
    };
    let editFirstName = contactEditInput.firstName;
    let editLastName = contactEditInput.lastName;
    let editHomeAddress = contactEditInput.homeAddress;
    let editPhoneNumber = contactEditInput.phoneNumber;
    let editEmailAddress = contactEditInput.emailAddress;

    if (editMode) {
        editFirstName = (
            <input type="text"
                   name='firstName'
                   value={contactEditInput.firstName}
                   onChange={e => updateForm(e)}
                   onBlur={saveUpdated}/>
        );

        editLastName = (
            <input type="text"
                   name='lastName'
                   value={contactEditInput.lastName}
                   onChange={e => updateForm(e)}
                   onBlur={saveUpdated}/>
        );

        editHomeAddress = (
            <input type="text"
                   name='homeAddress'
                   value={contactEditInput.homeAddress}
                   onChange={e => updateForm(e)}
                   onBlur={saveUpdated}/>
        );

        editPhoneNumber = (
            <input type="text"
                   name='phoneNumber'
                   value={contactEditInput.phoneNumber}
                   onChange={e => updateForm(e)}
                   onBlur={saveUpdated}/>
        );
        editEmailAddress = (
            <input type="text"
                   name='emailAddress'
                   value={contactEditInput.emailAddress}
                   onChange={e => updateForm(e)}
                   onBlur={saveUpdated}/>
        );
    }
    const contactCard = {
        color: 'black',
        margin: 'auto',
        width: '300px',
        height: ' 240px',
        backgroundColor: '#ccc',
        borderRadius: '3px',
    };
    return (
        <div style={contactCard}>
            <p>{editFirstName}</p>
            <p>{editLastName}</p>
            <p>{editHomeAddress}</p>
            <p>{editPhoneNumber}</p>
            <p>{editEmailAddress}</p>
            <Button color='primary' onClick={update}>edit contact</Button>
             <Button onClick={deleteContact}>delete contact</Button>
        </div>
    )
};
export default ListContacts;



