import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, savePost, updatePost, deletePost, splitBill } from '../redux/actions/getBillAction';
import { Field, reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import validateInput from '../validations';
import classnames from 'classnames';

import Bill from '../components/Bill'

class BillContainer extends Component {
  
  constructor(props){
		super(props);
    this.state = {
      cost:'',
      description:'',
      person:'',
      errors: {}
    };
		this.onChange = this.onChange.bind(this);
	}

  componentWillMount() {
    this.props.getPosts();
  }

  renderPosts() {
    return (
        <div className="ibox float-e-margins">
          <div className="ibox-title">
            <h2>Table</h2>
          </div>
          <div className="ibox-content">
            <div className="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Bill</th>
                    <th>Description</th>
                    <th>Enter quantity person</th>
                    <th>Splitted Cost</th>
                    <th>Manage</th>
                  </tr>
                </thead> 
                <tbody>
                  {_.map(this.props.bill, (item, key) => {
                    return (
                      <Bill
                        key={key}
                        id={key}
                        bill={item}
                        delete={() => this.props.deletePost(key).then(this.props.dispatch(reset('NewPost')))}
                        onChange={this.onChange}
                        updateBill={() => this.props.updatePost(key,item).then(this.props.dispatch(reset('NewPost')))}
                        splitBill={() => this.props.splitBill(key,item)}
                      />
                    )})
                  }
                </tbody>
              </table>
            </div>  
          </div>
        </div>
    )
    
  }

  renderField(field) {
    return (
      <input type="text" placeholder={`Enter a ${field.label}...`} {...field.input} className={field.class} />
    );
  }

  onChange(e){
	 this.setState({[e.target.name]:e.target.value});
  }

  isValid() {
      const { errorsInput,isValidInput } = validateInput(this.state);
      if (!isValidInput) {
        this.setState({ errors: errorsInput});
      }
      else{
        this.setState({ errors: {}});
      }
      return isValidInput;
  }

  onSubmit(values) {
    // if(this.isValid()){
      this.props.savePost(values).then(this.props.dispatch(reset('NewPost')));  
    // }
  }

  render() {
    const { errors } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="wrapper wrapper-content">
        <div className="row">
          <div className="col-lg-3">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
               <h2>Add new Bill</h2>
              </div>
              <div className="ibox-content">
                <form role="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div className={classnames("form-group",{"has-error":errors.cost})}>
                    <label>Cost</label>
                    <Field
                      name="cost"
                      component={this.renderField}
                      label="Cost"
                      class="footer-cost form-control"
                      value={this.state.cost}
                    />
                    {errors.cost && <p className="error">{errors.cost}</p>}
                  </div>
                  <div className={classnames("form-group",{"has-error":errors.description})}>
                    <label>Description</label>
                    <Field
                      name="description"
                      component={this.renderField}
                      label="Description"
                      class="footer-description form-control"
                      value={this.state.description}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                  </div>
                  <div className={classnames("form-group",{"has-error":errors.quantityPerson})}>
                    <label>Quantity Person</label>
                    <Field
                      name="quantityPerson"
                      component={this.renderField}
                      label="Quantity Person"
                      class="footer-quantityPerson form-control"
                      value={this.state.quantityPerson}
                    />
                    {errors.quantityPerson && <p className="error">{errors.quantityPerson}</p>}
                  </div>
                  <button type="submit" className="btn btn-success">Create</button>
                </form> 
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            {this.renderPosts()}    
          </div>
        </div>
      </div>
    );
  }
}

let form = reduxForm({
  form: 'NewPost'
})(BillContainer);

form = connect(state => ({
    bill: state.bill
  }), { savePost, getPosts, updatePost, deletePost, splitBill }
)(form);

export default form;