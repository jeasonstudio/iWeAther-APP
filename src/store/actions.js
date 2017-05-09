/**
 * @file action.js
 * @author Jeason<me@jeasonstudio.cn>
 */

export default {
    getData: ({dispatch}, actions) => Promise.all(actions.map(action => dispatch(action))),
    // Fake Async API Calls
    getTestTitle: ({commit}) => new Promise(resolve => {
        setTimeout(() => {
            commit('SET_TEST_TITLE', 'Test | iWeAther-APP');
            resolve();
        }, 1000);
    }),
    getTestContent: ({commit}) => new Promise(resolve => {
        setTimeout(() => {
            commit('SET_TEST_CONTENT', '');
            resolve();
        }, 1000);
    })
};
