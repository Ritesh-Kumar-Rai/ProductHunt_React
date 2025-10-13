import React from 'react';

import { FaLongArrowAltRight } from "react-icons/fa";
import Card from './Card';
import Button from './Button';

const TopProductListShow = ({label, productsArr = []}) => {



    const arr = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <section className='my-20'>
            <div className='mb-4 pb-3 border-b-2 border-gray-200 flex items-center justify-between flex-wrap gap-3'>
                <h3 className='text-3xl font-semibold'>{label}</h3>
                <Button label={"View More"} icon={<FaLongArrowAltRight size={15} />} placeright={true} />
            </div>
            <div className='w-full overflow-x-scroll flex items-center justify-start gap-5 p-2'>
                {productsArr.map((each_item) => <Card key={each_item.id} item={each_item} />)}
            </div>
            
        </section>
    )
}

export default TopProductListShow