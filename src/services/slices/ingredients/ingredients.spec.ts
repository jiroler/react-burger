import thunk from 'redux-thunk'
import ingredientsSlice, { getIngredients, getIngredientsError, getIngredientsRequest, getIngredientsSuccess } from './ingredients'
import fetchMock from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store'
import { TAppDispatch, TRootState } from '../../store'
import { fakeBun, fakeIngredient1, fakeIngredient2 } from '../../../utils/fake'

const middlewares = [thunk]
const mockStore = configureMockStore<Pick<TRootState, 'ingredients'>, TAppDispatch>(middlewares)

fetchMock.enableMocks()

describe('ingredientsSlice reducer', () => {
    it('should handle getIngredientsRequest', () => {
        const nextState = ingredientsSlice.reducer(undefined, getIngredientsRequest())
        expect(nextState).toEqual({ items: [], isPending: true, error: null })
    })

    it('should handle getIngredientsSuccess', () => {
        const payload = { items: [fakeBun, fakeIngredient1, fakeIngredient2] }
        const nextState = ingredientsSlice.reducer(undefined, getIngredientsSuccess(payload))
        expect(nextState).toEqual({ items: [fakeBun, fakeIngredient1, fakeIngredient2], isPending: false, error: null })
    })

    it('should handle getIngredientsError', () => {
        const payload = { message: 'Error message' }
        const nextState = ingredientsSlice.reducer(undefined, getIngredientsError(payload))
        expect(nextState).toEqual({ items: [], isPending: false, error: 'Error message' })
    })
})

describe('ingredientsSlice reducer (async)', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it('should handle getIngredients', async () => {

        const store = mockStore({ [ingredientsSlice.name]: ingredientsSlice.getInitialState() })
        const mockResponse = { success: true, data: [fakeBun, fakeIngredient1, fakeIngredient2] }

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 })

        await store.dispatch(getIngredients())

        const expectedActions = [
            { type: getIngredientsRequest.type, payload: undefined },
            { type: getIngredientsSuccess.type, payload: { items: [fakeBun, fakeIngredient1, fakeIngredient2] } }
        ]
        expect(store.getActions()).toEqual(expectedActions)
    })
})
