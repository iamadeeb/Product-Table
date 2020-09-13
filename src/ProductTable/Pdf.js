import React, { Component } from 'react';
import ReactToPdf from "react-to-pdf";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import logo from './logo.png';
import './Designs.css';
import { Button } from 'react-bootstrap';

const ref = React.createRef();
const options = {
    orientation: 'portrait',
    unit: 'in',
    format: [8.27, 11.69]
};

class PDF extends Component {
    constructor(props) {
        super(props)
        this.state = { ProductData: [] }
    }



    componentDidMount() {
        axios.get('http://localhost:3000/products').then(response => {
            console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
    };


    render() {

        return (
            <div>
               
                 <ReactToPdf targetRef={ref} filename="div-blue.pdf" options={options} x={0} y={0}>
                    {({ toPdf }) => (
                        <Button onClick={toPdf}>Generate pdf</Button>
                    )}
                </ReactToPdf>
                <div style={{ width: '50%',  }} ref={ref} >

                    <img src={logo} class="center" style={{ width: '30%', }} alt="Logo" />
                    <h1 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >Peerlog A.Ş.</h1>
                    <h1 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >İş Raporu</h1>

                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">ID</TableCell>
                                    <TableCell align="right">Manufacture</TableCell>
                                    <TableCell align="right">Model</TableCell>
                                    <TableCell align="right">Modelyear</TableCell>
                                    <TableCell align="right">Color</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Condition</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.ProductData.map((p, index) => {
                                        return <TableRow key={index}>
                                            <TableCell component="th" scope="row" align="right">
                                                {p.id}
                                            </TableCell>
                                            <TableCell align="right">{p.manufacture}</TableCell>
                                            <TableCell align="right">{p.model}</TableCell>
                                            <TableCell align="right">{p.modelyear}</TableCell>
                                            <TableCell align="right">{p.color}</TableCell>
                                            <TableCell align="right">{p.price}</TableCell>
                                            <TableCell align="right">{p.status}</TableCell>
                                            <TableCell align="right">{p.condition}</TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>

                </div>
            </div>

        );
    }
}

export default PDF;