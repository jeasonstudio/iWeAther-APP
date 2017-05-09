/**
 * @file mutations.js
 * @author Jeason<me@jeasonstudio.cn>
 */

export default {
    SET_TEST_TITLE(store, title) {
        store.testTitle = title;
    },
    SET_TEST_CONTENT(store, content) {
        store.testContent = content;
    }
};
