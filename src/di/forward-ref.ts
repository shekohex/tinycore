/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { stringify } from './facade/lang';
import { Type } from './facade/type';

/**
 * An interface that a function passed into {@link forwardRef} has to implement.
 *
 * ### Example
 *
 * {@example core/di/ts/forward-ref/forward-ref_spec.ts region='forward-ref_fn'}
 * @experimental
 */
export type ForwardRefFn = () => any;

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {@example core/di/ts/forward-ref/forward-ref_spec.ts region='forward-ref'}
 * @experimental
 */
export function forwardRef(forwardRefFn: ForwardRefFn): Type<any> {
  (forwardRefFn as any).__forward_ref__ = forwardRef;
  (forwardRefFn as any).toString = function() {
    return stringify(this());
  };
  return (forwardRefFn as any) as Type<any>;
}

/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * {@example core/di/ts/forward-ref/forward-ref_spec.ts region='resolve_forward-ref'}
 *
 * See: {@link forwardRef}
 * @experimental
 */
export function resolveForwardRef(type: any): any {
  if (
    typeof type === 'function' &&
    type.hasOwnProperty('__forward_ref__') &&
    type.__forward_ref__ === forwardRef
  ) {
    return (type as ForwardRefFn)();
  } else {
    return type;
  }
}
