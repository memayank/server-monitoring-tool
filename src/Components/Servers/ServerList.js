import React, { useState } from "react";
import { 
    Button,
    Container,
    Table
 } from "reactstrap";
 import AddServerData from './AddServerData'

const ServerList = () => {

  const [showAddServerForm, setShowAddServerForm] = useState(false);

  const handleAddButtonClick = ()=>{
    console.log("test")
    setShowAddServerForm(!showAddServerForm);
  }

  return (

    <>
        <div>
            <h5>Server Details <Button onClick={handleAddButtonClick}>Add New</Button></h5>
        </div>
        {
          showAddServerForm ? 
          <AddServerData
            showAddServerForm = {showAddServerForm}
            handleAddButtonClick={handleAddButtonClick}
          />: ""
        }
        
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Server Name</th>
            <th>IP address</th>
            <th>Add On</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
      </>
  );
};

export default ServerList;
