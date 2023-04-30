import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
import cn from 'classnames'
import { dataItemType } from '../../utils/data'
import { arrayOf } from 'prop-types'

export default function BurgerConstructor({ top, bottom, list }) {
    return (
        <section className='pt-25 pl-4'>
            <ConstructorElement
                type="top"
                isLocked={true}
                text={top.name}
                price={top.price}
                thumbnail={top.image}
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
                text={bottom.name}
                price={bottom.price}
                thumbnail={bottom.image}
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
    top: dataItemType,
    bottom: dataItemType,
    list: arrayOf(dataItemType).isRequired
}
