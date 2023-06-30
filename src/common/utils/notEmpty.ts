import { Nullable } from '@/common/types/nullable';

export function notEmpty<TValue>(value: Nullable<TValue>): value is TValue {
    return value !== null && value !== undefined;
}
