import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import history from "../history"
import { MDBTypography } from 'mdbreact'
import { MDBContainer } from "mdbreact";


const initState = {
  manufacture: '',
  model: '',
  modelyear: '',
  color: '',
  price: '',
  status: '',
  condition: '',

};


class AddProduct extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  onChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const { manufacture, model, modelyear, color, price, status, condition } = this.state;

    if (manufacture == "" || model == "" || modelyear == "" || color == "" || price == "" || status == "" || condition == "" || condition == "Choose Condition..." || status == "Choose Status...") {
      console.log("cant be empty")
      alert('Please fill all of the text boxes!');
    }
    else {

      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: {
          manufacture,
          model,
          modelyear,
          color,
          price,
          status,
          condition
        }
      });

      this.setState(initState)
    }
  }
  render() {

    const { manufacture, model, modelyear, color, price, status, condition } = this.state;

    return (

     

        <MDBContainer>
        <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
          <MDBTypography tag='h1' variant="display-3">Ürün Ekle</MDBTypography>
         
        </form>
        <form class="form-inline d-flex justify-content-left md-form form-sm active-cyan-2 mt-2">
          <Button variant="btn btn-success" onClick={() => history.push('/')} >Geri</Button>
        </form>

          <Form>
            <FormGroup>
              <Label for="manufacture">Manufacture</Label>
              <Input name="manufacture" value={manufacture} onChange={this.onChange} ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="model">Model</Label>
              <Input name="model" value={model} onChange={this.onChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="modelyear">Model Year</Label>
              <Input name="modelyear" value={modelyear} onChange={this.onChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="color">Color</Label>
              <Input name="color" value={color} onChange={this.onChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input name="price" value={price} type="number" onChange={this.onChange}></Input>
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input type="select" name="status" value={status} onChange={this.onChange}>
                <option>Choose Status...</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="condition">Condition</Label>
              <Input type="select" name="condition" value={condition} onChange={this.onChange}>
                <option>Choose Condition...</option>
                <option>New</option>
                <option>Used</option>
              </Input>
            </FormGroup>
            <Button type="submit" onClick={this.onSubmit} >Kaydet</Button>
          </Form>
        </MDBContainer>

   
    );
  }
}

export default AddProduct;