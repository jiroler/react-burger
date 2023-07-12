/* eslint-disable camelcase */
export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export type TConstructorIngredient = TIngredient & {
    uuid: string
}

export enum ECookie {
    refreshToken = 'refreshToken',
    accessToken = 'accessToken'
}

export enum EOrderStatus {
    done = 'done',
    created = 'created',
    pending = 'pending',
    cancelled = 'cancelled'
}

export type TOrder = {
    _id: string;
    ingredients: string[];
    status: EOrderStatus;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

export type TSocketData = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
}
