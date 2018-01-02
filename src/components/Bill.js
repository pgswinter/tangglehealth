import React,{Component} from 'react'

class Bill extends Component{
	constructor(props){
		super(props);
		this.state = {
		 	bill: this.props.bill
		};

		this.Delete = this.Delete.bind(this);
		this.Change = this.Change.bind(this);
		this.Update = this.Update.bind(this);
		this.Split = this.Split.bind(this);
	}

	Delete(){				
		this.props.delete(this.props.id);
	}

	Change(e){				
		var input = e.target;
		this.setState(function(prevState, props) {
			var tempBill = prevState.bill;
			tempBill[input.name] = input.value;
			return {
		    	bill: tempBill
		  	};
		});		
	}

	Update(){
		this.props.updateBill(this.props.id,this.state.bill)
	}

	Split(){
		return this.props.splitBill(this.props.id,this.state.bill)
	}
	render(){
		return(
			<tr>
				<td><input type="text" value={this.state.bill.cost} onChange={this.Change} name='cost' className="form-control"/></td>
				<td><input type="text" value={this.state.bill.description} onChange={this.Change} name='description' className="form-control"/></td>
				<td><input type="text" value={this.state.bill.quantityPerson} onChange={this.Change} name='quantityPerson' className="form-control"/></td>
				<td><input type="text" value={this.Split()} onChange={this.Change} name='splitCost' disabled className="form-control"/></td>
				<td><button className="btn btn-primary" onClick={this.Update}>Edit</button></td>
				<td><button className="btn btn-danger" onClick={this.Delete}>Delete</button></td>
			</tr>
		)
	}
}

export default Bill