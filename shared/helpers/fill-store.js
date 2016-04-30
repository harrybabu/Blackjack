export default function fillStore(store, components,params) {
    return Promise.all(
        components.map(component => {
            component = component && component.WrappedComponent || component;
            if(!component || !component.fillStore) {
                return;
            }
            return component.fillStore(store,params);
        })
    );
}
