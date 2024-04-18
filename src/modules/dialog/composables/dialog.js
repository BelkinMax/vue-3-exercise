import { shallowReactive } from 'vue';

const dialogs = shallowReactive([]);

export const useDialog = () => {
  const open = (component, props = {}, options = {}) => new Promise((resolve) => {
    dialogs.push({ component, props, options, resolve });
  });

  const close = (modalResult) => {
    const dialog = dialogs.pop();
    dialog && dialog.resolve(modalResult);
  };

  return { dialogs, open, close };
};
