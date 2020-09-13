import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";



import ProductTable from "./ProductTable/ProductTable";
import history from './history';
import AddProducts from "./AddProducts/AddProducts";
import DoughnutChart from "./Charts/DoughnutChart/DoughnutChart";
import PieChart from './Charts/PieChart/PieChart'
import PDF from './ProductTable/Pdf'

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={ProductTable} />

                    <Route path="/AddProducts" component={AddProducts} />
                    <Route path="/Charts/PieChart" component={PieChart} />
                    <Route path="/Charts/DoughnutChart" component={DoughnutChart} />
                    <Route path="/ProductTable" component={PDF} />
                </Switch>
            </Router>
        )
    }
}