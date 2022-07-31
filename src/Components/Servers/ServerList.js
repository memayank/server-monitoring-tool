import React, { useState, useEffect} from "react";
import { 
    Button,
    Container,
    Table
 } from "reactstrap";
 import AddServerData from './AddServerData';
 import ServerService from "../../Services/ServerService";
import EditServerData from "./EditServerData";

const ServerList = () => {

  const [showAddServerForm, setShowAddServerForm] = useState(false);
  const [showEditServerForm, setShowEditServerForm] = useState(false);
  const [serverList, setServersList] = useState([]);
  const [currentServer, setCurrentServer] = useState({
    serverName: "",
    ipAddress: "",
    id: ""
  })

  const [updateList, setUpdateList] = useState(true);

  useEffect(()=>{
    (async()=>{
      const response = await ServerService.getServersList();
      if(response){
        setServersList(response.servers)
      }
    })()
  },[showAddServerForm,showEditServerForm, updateList]);

  const handleAddButtonClick = ()=>{
    setShowAddServerForm(!showAddServerForm);
  }

  const handleEditButtonClick = (data)=>{
    setCurrentServer({
      ...data
    });
    setShowEditServerForm(!showEditServerForm);
  }

  const handleDeleteButtonClick = async(id)=>{
    const response = await ServerService.deleteServer({id});
    if(response.status){
      setUpdateList(!updateList)
    }
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

            />: 
          showEditServerForm? 
            <EditServerData
              showEditServerForm = {showEditServerForm}
              handleEditButtonClick={handleEditButtonClick}
              currentServer= {currentServer}
            />:""
        }
        
      <Table hover responsive>
        <thead>
          <tr>
            <th>Server Name</th>
            <th>IP address</th>
            <th>Add On</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            serverList.map(server=>
              <tr>
                <td>{server.server_name}</td>
                <td>{server.ip_address}</td>
                <td>{server.date}</td>
                <td>{server.status? "Active": "Inactive"}</td>
                <td>
                  <Button className=" btn btn-primary" onClick={()=>{handleEditButtonClick({
                    id: server._id,
                    serverName: server.server_name,
                    ipAddress: server.ip_address
                  })}}>Edit</Button>
                  <Button className="btn btn-danger"onClick={()=>{handleDeleteButtonClick(server._id)}}>Delete</Button>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
      </>
  );
};

export default ServerList;
