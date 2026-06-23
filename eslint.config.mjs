import next from 'eslint-config-next';

export default [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...next,
  {
    rules: {
      // These React Compiler-aware rules fire on stock shadcn/ui boilerplate
      // (sidebar/carousel/use-mobile) and standard effect patterns. Keep them
      // visible as warnings rather than build-blocking errors.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
];
