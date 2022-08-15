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

  const handleDeleteButtonClick = async(serverDetails)=>{
    const response = await ServerService.deleteServer({
      ...serverDetails
    });
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
            serverList.map((server)=>{
              return !server.deleted ?  <tr>
              <td>{server.name}</td>
              <td>{server.ip}</td>
              <td>{server.date}</td>
              <td>{server.status? "Active": "Inactive"}</td>
              <td>
                <Button className=" btn btn-primary" onClick={()=>{handleEditButtonClick({
                  id: server.id,
                  name: server.name,
                  ip: server.ip,
                  status: server.status,
                  date: server.date
                })}}>Edit</Button>
                <Button className="btn btn-danger"onClick={()=>{handleDeleteButtonClick(server)}}>Delete</Button>
              </td>
            </tr>:null
            })
          }
        </tbody>
      </Table>
    </>
  );
};

export default ServerList;
