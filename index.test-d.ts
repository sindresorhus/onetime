import {expectType} from 'tsd';
import onetime from './index.js';

const foo = onetime(() => 5);
expectType<number>(foo());

const foo2 = onetime(() => true, {throw: true});
expectType<boolean>(foo2());

expectType<number>(onetime((first: boolean) => 5)(true));
expectType<number>(onetime((first: boolean, second: string) => 5)(true, ''));

expectType<number>(onetime.callCount((first: boolean, second: string) => 5));
