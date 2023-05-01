
import { data } from '../../utils/data'
import AppHeader from '../app-header'
import BurgerConstructor from '../burger-constructor'
import BurgerIngredients from '../burger-ingredients'
import styles from './styles.module.css'

const constructorProps = {
    top: data[0],
    bottom: data[data.length - 1],
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
