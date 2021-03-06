import axios from 'axios';
import { CREATE_STAFF_MEMBER, REMOVE_STAFF_MEMBER, SELECT_STAFF_MEMBERS, CLOSE_MODAL, OPEN_SNACKBAR } from './types';
import { rootURL } from '../../globals';

export function selectStaff(staff) {
	return { type: SELECT_STAFF_MEMBERS, staff: staff };
}

export function addStaffMember(formVals, dispatch, { location }) {
	
	const body = {
		email: formVals.email,
		league: location.state.leagueId,
	};

	axios.post(`${rootURL}/settings/create`, body)
		.then(({data}) => {
			return dispatch({ type: CREATE_STAFF_MEMBER, newStaff: body.email });
		})
		.catch( err => {
			throw new Error(err);
		});
}

export function removeStaff(staffInfo) {

	const { email, leagueId } = staffInfo;
	const message = `${email} has been deleted as a staff member of your league`;

	return function(dispatch) {
		
		dispatch({ type: CLOSE_MODAL });

		axios.delete(`${rootURL}/settings/remove/${email}`, 
				{ params: { leagueId } })
			.then((data) => dispatch({ type: REMOVE_STAFF_MEMBER, removedStaffEmail: email }))
			.then(() => dispatch({ type: OPEN_SNACKBAR, message }));
	};
}
