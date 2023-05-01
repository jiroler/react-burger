import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import cn from 'classnames'
import { dataItemType } from '../../utils/data'
import { arrayOf } from 'prop-types'

export default function BurgerConstructor({ bun, list }) {
    return (
        <section className='pt-25 pl-4'>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={[bun.name, '(верх)'].join('\n')}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={cn(styles.dark, 'ml-8 mb-4')}
            />
            <div className={cn(styles.list, 'custom-scroll')}>
                {list.map(item => (
                    <div key={item._id} className={styles.item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            extraClass={styles.dark}
                        />
                    </div>
                ))}
            </div>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text={[bun.name, '(низ)'].join(' ')}
                price={bun.price}
                thumbnail={bun.image}
                extraClass={cn(styles.dark, 'ml-8 mt-4')}
            />

            <div className={cn(styles.summary, 'mt-10 pr-4')}>
                <p className="text text_type_digits-medium">
                    610
                    <CurrencyIcon type="primary"/>
                </p>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    bun: dataItemType,
    list: arrayOf(dataItemType).isRequired
}
