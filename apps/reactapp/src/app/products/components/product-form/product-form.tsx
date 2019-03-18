import * as React from 'react';
import "./product-form.scss";
import { Entity } from '../../+state/products.reducer';

interface Props {
    opened: boolean;
    productInformation: Entity
    onClosed: any;
}

export default class Productform extends React.Component<Props, Entity> {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(a) {
        this.setState({ ...this.state, ...a.productInformation });
    }

    printLog = (e) => {
        e.preventDefault();
        this.props.onClosed(false);
    }

    get isOpened() {
        return this.props.opened
    }

    detectChangeOnField(field, e) {
        e.preventDefault();
        const obj = {};
        obj[`${field}`] = e.target.value;
        console.warn({ ...this.state, ...obj });
        this.setState({ ...this.state, ...obj });
    }

    onFormSubmit(e) {
        console.warn(this.state);
        e.preventDefault();
    }

    render() {

        return (

            <React.Fragment>
                {this.isOpened && (
                    <React.Fragment>
                        <div className="dialog-mask dialog-mask--material"></div>
                        <div className="dialog dialog--material product-form-container" onClick={this.printLog}></div>
                        <div className="dialog dialog-container--material product-form-wrapper">
                            <div>
                                <h1> Add a Product {this.state.name}</h1>
                                <p> Please fill the data requested in this dialog to add a product to our table,
                including Product name, price and Category.</p>
                                <span>
                                    <form onSubmit={this.onFormSubmit}>
                                        <input className="text-input text-input--underbar product-form-wrapper-input" placeholder="Product Name" value={this.state.name} type="text" onChange={(e) => { this.detectChangeOnField('name', e) }} required />
                                        <br />
                                        <input className="text-input text-input--underbar product-form-wrapper-input" placeholder="Price" type="text" value={this.state.price} onChange={(e) => { this.detectChangeOnField('price', e) }} required />
                                        <br />
                                        <div>
                                            <label htmlFor="category"> Category </label>
                                            <select id="category" className="select-input select-input--material" value={this.state.category} onChange={(e) => { this.detectChangeOnField('category', e) }}>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Sporting Goods">Sporting Goods</option>
                                            </select>
                                        </div>
                                    </form>
                                </span>
                                <button className="button button--outline" type="button">Cancel</button>
                                <button className="button" type="submit">Add</button>

                            </div>
                        </div>
                    </React.Fragment>
                )
                }
            </React.Fragment>
        )
    }
}
