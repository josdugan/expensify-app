import { LOGIN, LOGOUT, login, logout } from '../../actions/auth';

test('should create login action with given uid', () => {
    const uid = 'theuid';
    const action = login(uid);

    expect(action).toEqual({
        type: LOGIN,
        uid
    });
});

test('should create logout action', () => {
    const action = logout();

    expect(action).toEqual({
        type: LOGOUT
    });
});
