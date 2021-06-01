import { LOGIN, LOGOUT } from '../../actions/auth';
import authReducer from '../../reducers/auth';

test('should login user', () => {
    const uid = 'theuid';
    const action = {
        type: LOGIN,
        uid
    };

    const state = authReducer({}, action);

    expect(state).toEqual({
        uid
    });
    expect(state.uid).toBe(action.uid);
});

test('should logout user', () => {
    const action = {
        type: LOGOUT
    };

    const state = authReducer({ uid: 'theuid' }, action);

    expect(state).toEqual({});
});
