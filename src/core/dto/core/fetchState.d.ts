type loading = { loading: true; data?: undefined; error?: undefined };
type fulfilled<T> = { loading: false; data: T; error?: undefined };
type rejected = { loading: false; error: string; data?: undefined };

export type FetchState<T> = loading | fulfilled<T> | rejected;
