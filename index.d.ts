declare module 'randomf' {
  export default function(F: bigint, allowInsecure: boolean = true): bigint
  export function random(F: bigint, allowInsecure: boolean = true): bigint
}
