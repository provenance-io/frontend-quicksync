export const WARNING_MESSAGES = {
  warning01: `
    <h6>Note on 1.8.x cpu compatibility:</h6><code>wasm cache</code> was included in the quicksync files for certain cpu specific features. When extracted, these would cause various issues.  The simple, temporary solution is to remove the contents of <code>/provenanced/data/wasm/wasm/cache</code> when starting a node using an existing quicksync copy.  For additional information, see <a href="https://github.com/wasmerio/wasmer/issues/2781" target="_blank" rel="noreferrer">https://github.com/wasmerio/wasmer/issues/2781</a>.
  `,
};
