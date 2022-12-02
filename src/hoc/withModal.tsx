import React from "react";
export interface ViewModel<H> {
  Hook: () => H;
  CtxProvider: React.Provider<H>;
}
/**
 * HOC
 *
 * binds A View with its ViewModel
 */
function withViewModel<P, H>(C: React.FC<P>, vm: ViewModel<H>) {
  return (props: P) => {
    const state = vm.Hook();
    return (
      <vm.CtxProvider value={state}>
        <C {...props} {...state} />
      </vm.CtxProvider>
    );
  };
}
export default withViewModel;
