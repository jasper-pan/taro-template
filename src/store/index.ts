import { createContainer } from 'unstated-next';

const modulesFiles = require.context('./modules', true, /\.tsx$/);

function useStore() {
  return modulesFiles.keys().reduce((modules: { [x: string]: any; }, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default();
    return modules;
  }, {});
}

const Stores = createContainer(useStore);

export default Stores;

