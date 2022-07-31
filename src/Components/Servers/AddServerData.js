import React,{useState} from "react";
import ServerService from "../../Services/ServerService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input,FormFeedback, FormText, FormGroup } from "reactstrap";

const AddServerData = (props) => {
  const [modal, setModal] = useState(true);

  const [serverDetails, setServerDetails] = useState({
    serverName: "",
    ipAddress: ""
  })

  const [errors, setErrors] = useState({
    serverName: "",
    ipAddress: ""
  })
  const toggle = () => setModal(!modal);

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
    if(!serverDetails.serverName){
        isValid = false;
        setErrors({
            ...errors,
            serverName: "Server Name is required"
        })
    }
    if(!serverDetails.ipAddress){
        isValid = false;
        setErrors({
            ...errors,
            ipAddress: "Server Name is required"
        })
    }
    return isValid;
  }

  const handleSubmit = async()=>{
    const isValid = validateForm()
    if(isValid){
        //call api to create new server
        const response = await ServerService.addServer(serverDetails);
        props.handleAddButtonClick();
        console.log(response);
    }
  }
  return (
    <>
      <Modal isOpen={props.showAddServerForm} toggle={props.handleAddButtonClick}>
        <ModalHeader toggle={props.handleAddButtonClick}>Modal title</ModalHeader>
        <ModalBody>
            
            <FormGroup>
                <Label>Server Name</Label>
                <Input
                    name="serverName"
                    type="text"
                    onChange={handleInputChange}
                    invalid ={errors.serverName? true :false}
                />
                <FormFeedback>
                    {errors.serverName}
                </FormFeedback>

            </FormGroup>

            <FormGroup>
                <Label>Server IP</Label>
                <Input
                    name="ipAddress"
                    type="text"
                    onChange={handleInputChange}
                    invalid ={errors.ipAddress? true :false}
                />
                <FormFeedback>
                        {errors.ipAddress}
                </FormFeedback>
            </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Add Server
            
          </Button>{" "}
          <Button color="secondary" onClick={props.handleAddButtonClick}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddServerData;
