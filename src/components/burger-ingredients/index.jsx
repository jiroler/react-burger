import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
import cn from 'classnames'
import BurgerIngredient from './burger-ingredient'
import { arrayOf } from 'prop-types'
import { dataItemType } from '../../utils/data'

export default function BurgerIngredients({ data }) {

    return (
        <section className='pt-10'>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={cn(styles.tabs, 'mt-5 mb-10')}>
                <Tab active>Булки</Tab>
                <Tab>Соусы</Tab>
                <Tab>Начинка</Tab>
            </div>
            <div className={cn(styles.ingredients, 'custom-scroll')}>
                <p className='text text_type_main-medium'>Булки</p>
                <div className={cn(styles.container, 'p-4 pt-6 pb-10')}>
                    {data.filter(item => item.type === 'bun').map(item => (
                        <BurgerIngredient key={item._id} item={item} count={1}/>
                    ))}
                </div>
                <p className='text text_type_main-medium'>Соусы</p>
                <div className={cn(styles.container, 'p-4 pt-6 pb-10')}>
                    {data.filter(item => item.type === 'sauce').map(item => (
                        <BurgerIngredient key={item._id} item={item} count={2}/>
                    ))}
                </div>
                <p className='text text_type_main-medium'>Начинка</p>
                <div className={cn(styles.container, 'p-4 pt-6 pb-10')}>
                    {data.filter(item => item.type === 'main').map(item => (
                        <BurgerIngredient key={item._id} item={item} count={3}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: arrayOf(dataItemType).isRequired
}
