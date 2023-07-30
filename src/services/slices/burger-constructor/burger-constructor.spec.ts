import { fakeBun, fakeConstructorBun, fakeConstructorComponent1, fakeConstructorComponent2, fakeConstructorComponent3, fakeIngredient1 } from '../../../utils/fake'
import burgerConstructorSlice, { addIngredientToConstructor, clearConstructor, moveComponent, removeComponentFromConstructor } from './burger-constructor'

describe('burgerConstructorSlice reducer', () => {
    it('should be correct initial state', () => {
        expect(burgerConstructorSlice.getInitialState()).toEqual({ bun: null, components: [] })
    })

    it('should handle addIngredientToConstructor for bun', () => {
        const action = addIngredientToConstructor({ item: fakeBun, uuid: 'bun1' })
        const newState = burgerConstructorSlice.reducer(undefined, action)
        expect(newState).toEqual({ bun: fakeConstructorBun, components: [] })
    })

    it('should handle addIngredientToConstructor for component', () => {
        const action = addIngredientToConstructor({ item: fakeIngredient1, uuid: 'component1' })
        const newState = burgerConstructorSlice.reducer(undefined, action)
        expect(newState).toEqual({ bun: null, components: [fakeConstructorComponent1] })
    })

    it('should handle removeComponentFromConstructor', () => {
        const initialState = { bun: null, components: [fakeConstructorComponent1, fakeConstructorComponent2] }
        const action = removeComponentFromConstructor({ item: initialState.components[0] })
        const newState = burgerConstructorSlice.reducer(initialState, action)
        expect(newState).toEqual({ bun: null, components: [fakeConstructorComponent2] })
    })

    it('should handle moveComponent', () => {
        const initialState = { bun: null, components: [fakeConstructorComponent1, fakeConstructorComponent2, fakeConstructorComponent3] }
        const action = moveComponent({ uuid: fakeConstructorComponent3.uuid, index: 1 })
        const newState = burgerConstructorSlice.reducer(initialState, action)
        expect(newState).toEqual({ bun: null, components: [fakeConstructorComponent1, fakeConstructorComponent3, fakeConstructorComponent2] })
    })

    it('should handle clearConstructor', () => {
        const initialState = { bun: fakeConstructorBun, components: [fakeConstructorComponent1, fakeConstructorComponent2] }
        const newState = burgerConstructorSlice.reducer(initialState, clearConstructor())
        expect(newState).toEqual({ bun: null, components: [] })
    })
})
