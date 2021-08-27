export default function auth({ next, store }) {
    if (!store.getters['auth/user']) {
        store.dispatch('auth/me').then(() => {
            if (!store.getters['auth/user']) next({
                name: 'Login'
            });

            else next();
        });
    } else {
        next();
    }
}