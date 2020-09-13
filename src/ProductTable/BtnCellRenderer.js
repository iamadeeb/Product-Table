import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick = (e) => {

   // e is getting the current node (Row Node)
    
            this.setState({
                visible:true
            })
            let deletedRow = this.props.node.data;
            e.gridApi.updateRowData({ remove: [deletedRow] })  // It will update the row
            console.log(deletedRow.id)
           

            var ID = '/'+ deletedRow.id 
            console.log(ID)
            var url = "http://localhost:3000/products";
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", url + ID, true);
            console.log('deleted')
        
            xhr.send(null);
        };



  render() {
    return (
      <span><Button onClick={() => this.buttonClick(this.props.node)}>Sil</Button></span>
    )
  }
}

export default BtnCellRenderer;