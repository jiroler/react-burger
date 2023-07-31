/* eslint-disable camelcase */
import { EOrderStatus, TConstructorIngredient, TIngredient, TSocketData } from './types'

export const fakeBun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
}

export const fakeIngredient1: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
}

export const fakeIngredient2: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
}

export const fakeIngredient3: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    __v: 0
}

export const fakeConstructorBun: TConstructorIngredient = { ...fakeBun, uuid: 'bun1' }
export const fakeConstructorComponent1: TConstructorIngredient = { ...fakeIngredient1, uuid: 'component1' }
export const fakeConstructorComponent2: TConstructorIngredient = { ...fakeIngredient2, uuid: 'component2' }
export const fakeConstructorComponent3: TConstructorIngredient = { ...fakeIngredient3, uuid: 'component3' }

export const fakeSocketData: TSocketData = {
    success: true,
    orders: [
        { _id: '64c2ac8f82e277001bfa4abc', ingredients: ['643d69a5c3f7b9001cfa0945', '643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0945'], status: EOrderStatus.done, name: 'Антарианский флюоресцентный бургер', createdAt: '2023-07-27T17:42:39.851Z', updatedAt: '2023-07-27T17:42:40.038Z', number: 14714 },
        { _id: '64c2aa8f82e277001bfa4ab2', ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'], status: EOrderStatus.done, name: 'Space флюоресцентный бургер', createdAt: '2023-07-27T17:34:07.840Z', updatedAt: '2023-07-27T17:34:08.029Z', number: 14713 }
    ],
    total: 14340,
    totalToday: 183
}
