import React from 'react';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';

import { addStaffMember, openSnackbar } from '../../../../actions/index';

import { css_content, css_dashboard } from '../../../style';
import validate from './utils/addStaffFormValidation';

const AddStaffForm = props => {	
	const {handleSubmit} = props;
	return (
			<div style={css_content.body}>
				<h1 style={css_dashboard.title}>Grant access to a staff member</h1>
				<h6 style={css_dashboard.warning}>*Requires a Gmail Account</h6>
				<form 
					onSubmit={ handleSubmit }
					style={css_dashboard.form}
				>
					<Field
						name="email" 
						component={TextField}
						hintText="Enter A Gmail Account"
						floatingLabelText="User's Gmail Account*"
						floatingLabelStyle={css_dashboard.formRequired}
						fullWidth={true}
					/>									
					<RaisedButton
						label="Add Staff Member"
						labelStyle={css_dashboard.raisedButton.label}
						backgroundColor={css_dashboard.raisedButton.backgroundColor}
						style={css_dashboard.raisedButton.style}
						type="submit"
					/>
				</form>
			</div>
	);
};



export default reduxForm({
	form: 'AddStaffForm',
	validate,
	onSubmit: addStaffMember,
	onSubmitSuccess: openSnackbar,
})( AddStaffForm );


