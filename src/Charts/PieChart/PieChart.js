import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Button } from 'react-bootstrap';
import history from "../../history"

var price = []
var manufacture = []

class PieChart extends React.Component {

  state = {

    dataPie: {
      labels: manufacture,
      datasets: [
        {
          data: price,
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#AC64AD",
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB",
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  }




  componentDidMount() {

    fetch('http://localhost:3000/products')
      .then(result => result.json())
      .then(data => {

        price.length = 0;
        manufacture.length = 0;

        data.map((item) => {

          price.push(item.price);

        })


        data.map((item) => {

          manufacture.push(item.manufacture);

        })

        console.log(data);

        this.setState({ veri: data })

      }
      )
  }




  render() {
    return (
      <MDBContainer>
        <Button variant="btn btn-success" onClick={() => history.push('/')} >Geri</Button>
        <h3 className="mt-5">Pie Chart</h3>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
        <Button onClick={() => window.print()}>PDF</Button>
      </MDBContainer>
    );
  }
}

export default PieChart;