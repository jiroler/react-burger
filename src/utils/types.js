/* eslint-disable camelcase */
import PropTypes from 'prop-types'

const ingredientSchema = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
}

const constructorSchema = {
    ...ingredientSchema,
    uuid: PropTypes.string
}

export const ECookie = {
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    isResetRequested: 'isResetRequested'
}

export const ingredientItemType = PropTypes.exact(ingredientSchema)
export const constructorItemType = PropTypes.exact(constructorSchema)
