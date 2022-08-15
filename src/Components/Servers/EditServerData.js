import React,{useState} from "react";
import ServerService from "../../Services/ServerService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,FormFeedback, FormText, FormGroup } from "reactstrap";
import Select from 'react-select';


const AddServerData = (props) => {
  const [modal, setModal] = useState(true);
  const statusOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];
  const [serverDetails, setServerDetails] = useState({
        ...props.currentServer
  })

  const [errors, setErrors] = useState({
    name: "",
    ip: ""
  })
  const toggle = () => setModal(!modal);


  const onStatusChange = (event)=>{
    setServerDetails({
      ...serverDetails,
      status:event.value
    })
  }

  const handleInputChange = (event) =>{
    console.log(serverDetails)
    setServerDetails({
        ...serverDetails,
        [event.target.name]: event.target.value
    })
    setErrors({
        ...errors,
        [event.target.name]: ""
    })
  }

  const validateForm = () =>{
    let isValid = true;
    if(!serverDetails.name){
        isValid = false;
        setErrors({
            ...errors,
            name: "Server Name is required"
        })
    }
    if(!serverDetails.ip){
        isValid = false;
        setErrors({
            ...errors,
            ip: "Server Name is required"
        })
    }
    return isValid;
  }

  const handleSubmit = async()=>{
    const isValid = validateForm()
    if(isValid){
        //call api to create new server
        const response = await ServerService.editServerDetails(serverDetails);
        props.handleEditButtonClick();
        console.log(response);
    }
  }
  return (
    <>
      <Modal isOpen={props.showEditServerForm} toggle={props.handleEditButtonClick}>
        <ModalHeader toggle={props.handleEditButtonClick}>Modal title</ModalHeader>
        <ModalBody>
            
            <FormGroup>
                <Label>Server Name</Label>
                <Input
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    invalid ={errors.name? true :false}
                    value = {serverDetails.name} 
                />
                <FormFeedback>
                    {errors.name}
                </FormFeedback>

            </FormGroup>

            <FormGroup>
                <Label>Server IP</Label>
                <Input
                    name="ip"
                    type="text"
                    onChange={handleInputChange}
                    invalid ={errors.ip? true :false}
                    value = {serverDetails.ip}
                />
                <FormFeedback>
                        {errors.ip}
                </FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Server Status</Label>
                <Select
                    name="status"
                    onChange={onStatusChange}
                    value={statusOptions.find(option=>option.value === serverDetails.status)}
                    options={statusOptions}
                />
                <FormFeedback>
                        {errors.ip}
                </FormFeedback>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={props.handleEditButtonClick}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddServerData;
