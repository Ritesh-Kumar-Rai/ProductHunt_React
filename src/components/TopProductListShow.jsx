import { FaLongArrowAltRight } from "react-icons/fa";
import Card from './Card';
import Button from './Button';
import { useNavigate } from "react-router-dom";

const TopProductListShow = ({ label, productsArr = [] }) => {

    const navigate = useNavigate();

    return (
        <section className='my-20'>
            <div className='mb-4 pb-3 border-b-2 border-gray-200 flex items-center justify-between flex-wrap gap-3'>
                <h3 className='text-3xl font-semibold'>{label}</h3>
                <Button label={"View More"} icon={<FaLongArrowAltRight size={15} />} placeright={true} onClickHandler={() => navigate('/explore')} />
            </div>
            <div className='w-full overflow-x-scroll flex items-center justify-start gap-5 p-2'>
                {productsArr.length ? productsArr.map((each_item) => <Card key={each_item.id} item={each_item} />) : <div className="h-32 px-5 py-3 m-auto flex flex-col items-center justify-center gap-2 text-center">
                    <b>No products to show!</b>
                    <p className="text-slate-500">Try to refresh the page or go to explore page.. <br /> If you still didn't found the products "It's possibly an issue... try to contact developer"</p>
                </div>}
            </div>

        </section>
    )
}

export default TopProductListShow