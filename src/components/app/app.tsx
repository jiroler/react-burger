
import { data } from '../../utils/data'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'

const constructorProps = {
    bun: data[0],
    list: data.slice(1, -1)
}

function App() {
    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor {...constructorProps}/>
            </main>
        </>
    )
}

export default App
